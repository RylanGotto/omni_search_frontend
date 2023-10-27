import { InfoAccordions } from "../info/InfoAccordions";
import { KnowledgeGraph } from "../info/KnowledgeGraph";
import { QATimeLine } from "../chat/qaTimeline";
import { useEffect, useState } from "react";
import { AnswerBox } from "../info/AnswerBox";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { LoadingScreen } from "./LoadingScreen";
let search_websocket = new WebSocket("ws://localhost:8000/ws/omnibot")

const QAContainer = () => {
    const [sourceData, setSourceData] = useState([]);
    const [knowledgeGraph, setKnowledgeGraph] = useState([]);
    const [answerBox, setAnswerBox] = useState([]);
    const [loading, setLoading] = useState(false);
    let searchTerm = useSelector((state) => state.search.searchTerm);

    useEffect(() => {
        if (searchTerm !== "") {
            setLoading(true);
        }
    }, [searchTerm]);

    search_websocket.onmessage = (e) => {
        let a = JSON.parse(e.data)
        if ('results' in a) {
            if (a.results !== undefined && 'knowledgeGraph' in a.results) {
                setKnowledgeGraph([a.results.knowledgeGraph]);
            }
            if ('searchParameters' in a.results) {
                setSourceData(a.results);
                setLoading(false);
            }
        }
    };
    search_websocket.onclose = (e) => {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.')
        search_websocket = new WebSocket("ws://localhost:8000/ws/omnibot")
    }
    search_websocket.onerror = (e) => {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.')
        search_websocket = new WebSocket("ws://localhost:8000/ws/omnibot")
    }
    return (
        <div class="container">
            {loading && <LoadingScreen />}
            <div class="flex flex-wrap mb-24 gap-4">
                    <div class="w-80">
                        {knowledgeGraph.length > 0 && <KnowledgeGraph knowledge={knowledgeGraph}/>}
                    </div>
                    <div class="flex-1 w-full">
                        <QATimeLine />
                        <InfoAccordions search_results={sourceData} loading={loading}/>
                    </div>
                
            </div>
        </div>
    );
}

export default QAContainer;