import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Loading } from "../icons/icons";
import { useDispatch } from "react-redux";
import omni from "../assets/omni2.svg";

let bot_websocket = new WebSocket("ws://localhost:8000/ws/omnibot")

function UserTimelineItem({ user, message }) {
  return (
    
    <TimelineItem>
      
      <TimelineConnector />
      <TimelineHeader>
        <TimelineIcon className="p-0">
          {user !== "bot" ? (
            <Avatar
              size="sm"
              src="https://api.dicebear.com/7.x/lorelei/svg"
              alt="user 1"
              withBorder
            />
          ) : (
            <Avatar
              size="sm"
              src={omni}
              alt="user 2"
              withBorder
            />
          )}
        </TimelineIcon>
        <Typography variant="h5" color="blue-gray">
          {user !== "bot" ? user : "OmniBot"}
        </Typography>
      </TimelineHeader>
      <TimelineBody className="pb-8">
        <Typography color="gary" className="font-normal text-gray-600">
          {message}
        </Typography>
      </TimelineBody>
    </TimelineItem>
  );
}

export function QATimeLine() {
  let searchTerm = useSelector((state) => state.search.searchTerm);
  const [loading, setLoading] = useState(false);
  const [messages, setMessage] = useState([]);
  const [stream, setStream] = useState([]);

  bot_websocket.onclose = (e) => {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.')
    bot_websocket = new WebSocket("ws://localhost:8000/ws/omnibot")
  }
  bot_websocket.onerror = (e) => {
    console.log('Socket is closed. Reconnect will be attempted in 1 second.')
    bot_websocket = new WebSocket("ws://localhost:8000/ws/omnibot")
  }

  let dispatch = useDispatch();
  function handleStart(msg) {}

  function handleStream(token) {
    if (token.message === "MSG_DONE") {
      if (stream.join("") !== "") {
        setMessage([
          ...messages,
          { sender: "bot", message: stream.join(""), type: "stream" },
        ]);
        setLoading(false);
        dispatch((searchTerm = { type: "" }));
      }

      setStream([]);
      return;
    }

    setStream([...stream, token.message]);
  }
  function handleInfo(msg) {}
  function handleEnd(msg) {}
  function handleError(msg) {}

  function handleServerMessage(serverMessage) {
    let handler = null;
    switch (serverMessage.type) {
      case "start":
        handler = handleStart;
        break;
      case "stream":
        handler = handleStream;
        break;
      case "info":
        handler = handleInfo;
        break;
      case "end":
        handler = handleEnd;
        break;
      case "error":
      default:
        handler = handleError;
    }
    handler(serverMessage);
  }

  bot_websocket.onmessage = (e) => {
    handleServerMessage(JSON.parse(e.data));
  };

  useEffect(() => {
    if (searchTerm !== "") {
      setMessage([...messages, searchTerm]);
      bot_websocket.send(JSON.stringify(searchTerm));
      if (searchTerm !== "") {
        setLoading(true);
      }
    }
  }, [searchTerm]);

  return (
    <div className="w-full h-96 overflow-scroll">
      <Timeline>
        <div id="stream">
          <TimelineItem>
            <TimelineHeader>
              <TimelineIcon className="p-0">
                <Avatar
                  size="sm"
                  src={omni}
                  alt="user 2"
                  withBorder
                />
              </TimelineIcon>
              <Typography variant="h5" class="inline-block" color="blue-gray">
                Ask OmniBot... <Loading loading={loading} />
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pb-8">
              <Typography
                color="gary"
                className="cursor font-normal text-gray-600"
              >
                {stream.map((token, index) => (
                  <span>{token}</span>
                ))}
              </Typography>
            </TimelineBody>
          </TimelineItem>
        </div>
        <div id="message" className="message">
          {messages
            .map((message, index) => (
              <UserTimelineItem
                message={message.message}
                user={message.sender}
              />
            ))
            .reverse()}
        </div>
      </Timeline>
    </div>
  );
}
