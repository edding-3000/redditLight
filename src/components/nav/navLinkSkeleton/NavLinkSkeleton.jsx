import Skeleton from "react-loading-skeleton";

const NavLinkSkeleton = ({ num }) => {
    return (
        Array(num).fill(0).map((item, i) => (
            <li key={i}>
                <button>
                    <span><Skeleton circle width={"30px"} height={"30px"} /></span>
                    <span style={{ width: "100%" }}><Skeleton style={{ width: "100%" }} /></span>
                </button>
            </li>
        ))
    )
}

export default NavLinkSkeleton;