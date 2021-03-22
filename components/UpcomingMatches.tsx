import React, { useEffect, useState } from "react";
import { Match } from "../interfaces";
import { Box } from "grommet";
import Loading from "../assets/svg/loading.svg";
import Logo from "./Logo";
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
        return (
            <Loading
                style={{ margin: "15% 50%", width: "4em", height: "4em" }}
            />
        );
    }
    return (
        <React.Fragment>
            {upcomingMatches &&
                upcomingMatches.map((match) => (
                    <Box
                        pad='medium'
                        round='small'
                        direction='row'
                        // width='50em'
                        justify='between'
                        gap='xlarge'
                        responsive
                        overflow='auto'
                        style={{
                            boxShadow: "5px 5px 15px rgba(167, 167, 167, 0.25)",
                            // border: "1px solid black",
                            alignItems: "center",
                        }}
                        wrap>
                        <Box pad='small' responsive>
                            {match.name}
                        </Box>
                        <Box
                            pad='xsmall'
                            width='16em'
                            responsive
                            style={{ placeItems: "center" }}>
                            {match.homeTeam.name}
                        </Box>
                        <Box pad='small' width='2em' responsive>
                            VS
                        </Box>
                        <Box
                            pad='xsmall'
                            width='16em'
                            responsive
                            style={{ placeItems: "center" }}>
                            {match.awayTeam.name}
                        </Box>
                        <Box pad='small' responsive>
                            {new Date(match.startDateTime)
                                .toUTCString()
                                .slice(0, 16)}
                        </Box>
                    </Box>
                ))}
        </React.Fragment>
    );
};

export default UpcomingMatches;
