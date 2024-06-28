import MarkdownView from "react-showdown";

const SelfText = ({ text }) => {
    return (
        <span className="selfText">
            <MarkdownView
                markdown={text}
                options={{ tables: true, emoji: true, headerLevelStart: 4, simplifiedAutoLink: true }}
            />
        </span>
    )
}
export default SelfText;