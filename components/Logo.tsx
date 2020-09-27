import MI from "../assets/svg/mi.svg";
import CSK from "../assets/svg/csk.svg";
import RR from "../assets/svg/rr.svg";
import DC from "../assets/svg/dc.svg";
import SRH from "../assets/svg/srh.svg";
import RCB from "../assets/svg/rcb.svg";
import KKR from "../assets/svg/kkr.svg";
import KXIP from "../assets/svg/kxip.svg";
import React from "react";
import { ReactSVG } from "react-svg";

interface LogoProps {
    team: string;
}
const Logo: React.FC<LogoProps> = ({ team }) => {
    switch (team) {
        case "MI":
            return <MI />;
        case "CHE":
            return (
                <ReactSVG
                    src='csk.svg'
                    afterInjection={(error, svg) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        console.log(svg);
                    }}
                    beforeInjection={(svg) => {
                        svg.classList.add("svg-class-name-" + Math.random());
                        svg.id = Math.random().toString();
                    }}
                />
            );
        case "RCB":
            return (
                <ReactSVG
                    src='rcb.svg'
                    afterInjection={(error, svg) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        console.log(svg);
                    }}
                    beforeInjection={(svg) => {
                        svg.classList.add("svg-class-name-" + Math.random());
                        svg.id = Math.random().toString();
                    }}
                />
            );
        case "SUN":
            return (
                <ReactSVG
                    src='srh.svg'
                    afterInjection={(error, svg) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        console.log(svg);
                    }}
                    beforeInjection={(svg) => {
                        svg.classList.add("svg-class-name-" + Math.random());
                        svg.id = Math.random().toString();
                    }}
                />
            );
        case "DEL":
            return <DC />;
        case "RAJ":
            return (
                <ReactSVG
                    src='rr.svg'
                    afterInjection={(error, svg) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        console.log(svg);
                    }}
                    beforeInjection={(svg) => {
                        svg.classList.add("svg-class-name-" + Math.random());
                        svg.id = Math.random().toString();
                    }}
                />
            );
        case "KKR":
            return <KKR />;
        case "KXI":
            return (
                <ReactSVG
                    src='kxip.svg'
                    afterInjection={(error, svg) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        console.log(svg);
                    }}
                    beforeInjection={(svg) => {
                        svg.classList.add("svg-class-name-" + Math.random());
                        svg.id = Math.random().toString();
                    }}
                />
            );
        default:
            break;
    }
};

export default Logo;
