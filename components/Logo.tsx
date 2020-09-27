import MI from "../assets/svg/mi.svg";
import CSK from "../assets/svg/csk.svg";
import RR from "../assets/svg/rr.svg";
import DC from "../assets/svg/dc.svg";
import SRH from "../assets/svg/srh.svg";
import RCB from "../assets/svg/rcb.svg";
import KKR from "../assets/svg/kkr.svg";
import KXIP from "../assets/svg/kxip.svg";
import React from "react";

interface LogoProps {
    team: string;
}

const Logo: React.FC<LogoProps> = ({ team }) => {
    switch (team) {
        case "MI":
            return <MI />;
        case "CHE":
            return <CSK />;
        case "RCB":
            return <RCB />;
        case "SUN":
            return <SRH />;
        case "DEL":
            return <DC />;
        case "RAJ":
            return <RR />;
        case "KKR":
            return <KKR />;
        case "KXI":
            return <KXIP />;
        default:
            break;
    }
};

export default Logo;
