import { useState } from "react";
import TopHeader from "./topHeader/TopHeader";
import Sidebar from "./sidebar/Sidebar";

export default function Navigation() {

    const [menueOpen, setMenueOpen] = useState(true);

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