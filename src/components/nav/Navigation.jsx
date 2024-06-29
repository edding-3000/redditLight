import { useEffect, useState } from "react";
import TopHeader from "./topHeader/TopHeader";
import Sidebar from "./sidebar/Sidebar";
import useWindowDimensions from "../../utilitys/hooks/useWindowDimentions";

export default function Navigation() {

    const [menueOpen, setMenueOpen] = useState(true);

    const { width } = useWindowDimensions();
    useEffect(() => {
        if (width <= 750) {
            setMenueOpen(false);
        }
    }, [width])

    function toggleMenue() {
        menueOpen ? setMenueOpen(false) : setMenueOpen(true);
    }

    return (
        <>
            <TopHeader toggleMenue={toggleMenue} menueOpen={menueOpen} />
            <Sidebar menueOpen={menueOpen} />
        </>
    )
}