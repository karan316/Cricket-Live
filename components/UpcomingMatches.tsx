import React, { useEffect, useState } from "react";
import { Match } from "../pages/index";
interface MatchProps {
    matches: Match[];
    loading: Boolean;
}

const UpcomingMatches: React.FC<MatchProps> = ({ matches, loading }) => {
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>(null);

    useEffect(() => {
        setUpcomingMatches(matches);
        console.log("State: Upcoming matches", upcomingMatches);
    }, [matches]);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <React.Fragment>
            {upcomingMatches &&
                upcomingMatches.map((match) => (
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
                            </div>
                            <div className='team'>
                                <div className='name'>
                                    {match.awayTeam.name}
                                </div>
                                <div className='logo'>
                                    {match.awayTeam.shortName}
                                </div>
                            </div>
                        </div>
                        <div className='venue'>{match.venue.name}</div>
                    </div>
                ))}
        </React.Fragment>
    );
};

export default UpcomingMatches;
