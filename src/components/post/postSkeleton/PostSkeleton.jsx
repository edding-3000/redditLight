import Skeleton from "react-loading-skeleton";

const PostSkeleton = ({ num }) => {
    return (
        Array(num).fill(0).map((item, i) => (
            <span key={i} className="postContainer" style={{ backgroundColor: "transparent" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "small" }}>
                    <Skeleton circle height={"30px"} width={"30px"} />
                    <Skeleton width={"100px"} />
                    <Skeleton width={"100px"} />
                    <Skeleton width={"100px"} />
                </span>
                <span>
                    <Skeleton height={"30px"} width={"100%"} />
                    <Skeleton height={"30px"} width={"100px"} />
                </span>
                <span className="mediaContainer">
                    <Skeleton height={"70vh"} />
                </span>
                <span className="postInteraction">
                    <Skeleton height={"30px"} width={"100px"} />
                    <Skeleton height={"30px"} width={"60px"} />
                </span>
            </span>
        ))
    )
}
export default PostSkeleton;