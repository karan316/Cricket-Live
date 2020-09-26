import React, { useState, useEffect } from "react";
import { Match } from "../interfaces";
interface MatchProps {
    match: Match;
    loading: Boolean;
}
const LiveMatch: React.FC<MatchProps> = ({ match, loading }) => {
    const [liveMatch, setLiveMatch] = useState<Match>(null);
    useEffect(() => {
        setLiveMatch(match);
        // console.log("State: Live match", liveMatch);
    }, [match]);
    if (loading) return <div>Loading...</div>;
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
        <React.Fragment>
            <div className='name'>{name}</div>
            <div className='scoreboard'>
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
            <div className='venue'>{venue.name}</div>
        </React.Fragment>
    );
};

export default LiveMatch;
