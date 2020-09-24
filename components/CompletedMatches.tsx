import React, { useEffect, useState } from "react";
import { Match } from "../pages/index";
interface MatchProps {
    matches: Match[];
    loading: Boolean;
}
const CompletedMatches: React.FC<MatchProps> = ({ matches, loading }) => {
    const [completedMatches, setCompletedMatches] = useState<Match[]>(null);
    useEffect(() => {
        setCompletedMatches(matches);
    }, [matches]);
    if (loading) {
        return <div>Loading...</div>;
    }
    // console.log("Completed matches props: ", matches);
    return (
        // <div>Completed matches</div>
        <React.Fragment>
            {completedMatches &&
                completedMatches.map((match) => (
                    <div key={match.name}>
                        <div className='name'>{match.name}</div>
                        <div className='scoreboard'>
                            <div className='team'>
                                <div className='name'>
                                    {match.homeTeam.name}
                                </div>
                                <div className='logo'>
                                    {match.homeTeam.shortName}
                                </div>
                                <div className='score'>
                                    {match.scores.homeScore}
                                </div>
                                <div className='overs'>
                                    {match.scores.homeOvers}
                                </div>
                            </div>
                            <div className='team'>
                                <div className='name'>
                                    {match.awayTeam.name}
                                </div>
                                <div className='logo'>
                                    {match.awayTeam.shortName}
                                </div>
                                <div className='score'>
                                    {match.scores.awayScore}
                                </div>
                                <div className='overs'>
                                    {match.scores.awayOvers}
                                </div>
                            </div>
                        </div>
                        <div className='result'>{match.matchSummaryText}</div>
                        <div className='venue'>{match.venue.name}</div>
                    </div>
                ))}
        </React.Fragment>
    );
};

export default CompletedMatches;
