import Skeleton from "react-loading-skeleton";

const CommentSkeleton = ({ num }) => {
    return (
        Array(num).fill(0).map((item, i) => (
            <span key={i}>
                <span className="commentHead">
                    <Skeleton width={"140px"} />
                    <Skeleton circle width={"5px"} height={"5px"} containerClassName="flex-center" />
                    <Skeleton width={"160px"} />
                </span>
                <span>
                    <Skeleton count={4} />
                    <Skeleton width={"80%"} />
                </span>
                <span style={{ display: "block", paddingLeft: "40px" }}>
                    <span className="commentHead">
                        <Skeleton width={"100px"} />
                        <Skeleton circle width={"5px"} height={"5px"} containerClassName="flex-center" />
                        <Skeleton width={"160px"} />
                    </span>
                    <Skeleton />
                    <Skeleton width={"20%"} />
                </span>
            </span>
        ))
    )
}
export default CommentSkeleton;