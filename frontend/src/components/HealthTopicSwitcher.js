import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Sleep from "./Sleep";

function HealthTopicSwitcher() {
    const { topic } = useParams();
    
    const _topic = topic.toLowerCase();
    let TopicDisplayer;

    switch(_topic) {
        case "sleep":
            TopicDisplayer = Sleep;
            break;
        default:
            TopicDisplayer = PageNotFound;
            break;
    }

    return <TopicDisplayer />;
}

export default HealthTopicSwitcher;