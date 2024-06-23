import { useState } from "react";
import TopHeader from "./topHeader/TopHeader";
import Sidebar from "./sidebar/Sidebar";

export default function Navigation() {

    const [menueOpen, setMenueOpen] = useState(false);

    function toggleMenue() {
        menueOpen ? setMenueOpen(false) : setMenueOpen(true);
    }

    return (
        <>
            <TopHeader toggleMenue={toggleMenue} />
            <Sidebar menueOpen={menueOpen} />
        </>
    )
}