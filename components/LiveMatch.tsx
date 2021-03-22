import React, { useState, useEffect } from "react";
import { Match } from "../interfaces";
import { Box, Text } from "grommet";
import Loading from "../assets/svg/loading.svg";
import Logo from "./Logo";
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
    if (loading) return <Loading />;
    return (
        <React.Fragment>
            {liveMatch ? (
                <Box pad='large' align='center'>
                    <Text size='3rem' textAlign='center'>
                        Match Summary
                    </Text>
                    <Text>{name}</Text>
                    <Box
                        direction='row-responsive'
                        justify='center'
                        align='center'
                        pad='xlarge'
                        gap='xlarge'>
                        <Box
                            // pad='large'
                            align='center'
                            direction='column'
                            round='small'
                            style={{ margin: "0 2em" }}
                            gap='small'>
                            <Text size='8rem' color='red'>
                                {match.scores.homeScore}
                            </Text>
                            <Text>{match.scores.homeOvers} overs</Text>
                            <Logo team={match.homeTeam.shortName} />
                        </Box>
                        <Box
                            // pad='large'
                            align='center'
                            direction='column'
                            round='small'
                            style={{ margin: "0 2em" }}
                            gap='small'>
                            <Text size='8rem' color='red'>
                                {match.scores.awayScore}
                            </Text>
                            <Text>{match.scores.awayOvers} overs</Text>
                            <Logo team={match.awayTeam.shortName} />
                        </Box>
                        <Box>{match.matchSummaryText}</Box>
                        <Box>{match.venue.name}</Box>
                    </Box>
                </Box>
            ) : (
                <Box>No LIVE Matches at the moment</Box>
            )}
        </React.Fragment>
    );
};

export default LiveMatch;
