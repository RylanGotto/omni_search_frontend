import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ws = new WebSocket("ws://localhost:8000/ws")



export function Chat() {
    const [messages, setMessage] = useState([]);
    const [stream, setStream] = useState([]);

    ws.onopen = () => {
        // console.log("Web Socket connected!");
    };

    function handleStart(msg) {};

    function handleStream(token) {
        // console.log(token)
        if (token.message === "MSG_DONE") {
            setMessage([...messages, {sender: "bot", message: stream.join(""), type: "stream"}]);
            setStream([]);
            return;
        }

        setStream([...stream, token.message]);
    };
    function handleInfo(msg) {};
    function handleEnd(msg) {};
    function handleError(msg) {};

    function handleServerMessage(serverMessage) {
        let handler = null;
        switch (serverMessage.type){ 
            case 'start':
                handler = handleStart;
                break;
            case 'stream':
                handler = handleStream;
                break;
            case 'info':
                handler = handleInfo;
                break;
            case 'end':
                handler = handleEnd;
                break;
            case 'error':
            default:
                handler = handleError;
        }
        handler(serverMessage);
    }

    ws.onmessage = (e) => {
        handleServerMessage(JSON.parse(e.data))
    };

    function handleSubmit(e) {
        e.preventDefault();
        let message_body = {
            sender: "user",
            message: e.target.message.value,
            type: "user_message"
        };
        e.target.message.value = "";
        setMessage([...messages, message_body]);
        ws.send(JSON.stringify(message_body))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="message" />
                <input type="submit"  />
            </form>
            <div>
            <div id="message" className="message" >
                {messages.map((message, index) => (
                    <div>
                        {message.message}
                    </div>
                ))}
            </div>
            <div id="stream" >
                {stream.map((token, index) => (
                    <>
                        {token}
                    </>
                ))}  
            </div>
            </div>
        </>
    );
}