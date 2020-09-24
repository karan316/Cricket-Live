import React from "react";
import { Match } from "../pages/index";
interface MatchProps {
    liveMatch: Match;
}
const LiveMatch: React.FC<MatchProps> = ({ liveMatch }) => {
    if (!liveMatch) return <div>No LIVE Matches at the moment</div>;
    const {
        homeTeam,
        awayTeam,
        matchSummaryText,
        name,
        scores,
        venue,
    } = liveMatch;
    return (
        <div>
            <div className='name'>{name}</div>
            <div className='match'>
                <div className='team'>
                    <div className='name'>{homeTeam.name}</div>
                    <div className='logo'>{homeTeam.shortName}</div>
                    <div className='score'>{scores.homeScore}</div>
                    <div className='overs'>{scores.homeOvers}</div>
                </div>
                <div className='team'>
                    <div className='name'>{awayTeam.name}</div>
                    <div className='logo'>{awayTeam.shortName}</div>
                    <div className='score'>{scores.awayScore}</div>
                    <div className='overs'>{scores.awayOvers}</div>
                </div>
            </div>
            <div className='result'>{matchSummaryText}</div>
            <div className='venue'>{venue}</div>
        </div>
    );
};

export default LiveMatch;
