import React, { useEffect, useState } from "react";
import { Match } from "../interfaces";
import { Accordion, AccordionPanel, Box, Text } from "grommet";
import Loading from "../assets/svg/loading.svg";
import Logo from "./Logo";
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
        return (
            <Loading
                style={{ margin: "0 auto", width: "4em", height: "4em" }}
            />
        );
    }
    // console.log("Completed matches props: ", matches);
    return (
        <div style={{ marginTop: "0.8em" }}>
            {completedMatches &&
                completedMatches.map((match) => (
                    <Accordion
                        animate={true}
                        multiple={true}
                        width='110em'
                        key={match.name}
                        style={{
                            paddingLeft: "2em",
                            paddingRight: "2em",
                            boxShadow: "5px 5px 15px rgba(167, 167, 167, 0.25)",
                            marginBottom: "0.5em",
                            borderRadius: "10px",
                        }}>
                        <AccordionPanel
                            label={
                                <Box
                                    pad='medium'
                                    round='small'
                                    direction='row'
                                    width='90em'
                                    justify='between'
                                    // gap='medium'
                                    responsive
                                    overflow='auto'
                                    style={{ alignItems: "center" }}
                                    wrap>
                                    <Box pad='small' responsive>
                                        {match.name}
                                    </Box>
                                    <Box
                                        pad='xsmall'
                                        width='fit-content'
                                        responsive
                                        style={{ placeItems: "center" }}>
                                        <Logo
                                            team={match.homeTeam.shortName.toUpperCase()}
                                        />
                                    </Box>
                                    <Box pad='small' width='2em' responsive>
                                        VS
                                    </Box>
                                    <Box
                                        pad='xsmall'
                                        width='fit-content'
                                        responsive
                                        style={{ placeItems: "center" }}>
                                        <Logo
                                            team={match.awayTeam.shortName.toUpperCase()}
                                        />
                                    </Box>
                                    <Box pad='small' responsive>
                                        {new Date(match.startDateTime)
                                            .toUTCString()
                                            .slice(0, 16)}
                                    </Box>
                                </Box>
                            }
                            style={{ border: "none", height: "6em" }}>
                            <Box margin='large'>
                                <Text size='3rem' textAlign='center'>
                                    Match Summary
                                </Text>
                                <Box
                                    direction='row-responsive'
                                    justify='center'
                                    align='center'
                                    pad='xlarge'
                                    gap='xlarge'>
                                    <Box
                                        // pad='large'
                                        align='center'
                                        round='small'
                                        style={{ margin: "0 2em" }}
                                        gap='small'>
                                        <Text size='5rem' color='red'>
                                            {match.scores.homeScore}
                                        </Text>
                                        <Text>
                                            {match.scores.homeOvers} overs
                                        </Text>
                                    </Box>
                                    <Box
                                        // pad='large'
                                        align='center'
                                        round='small'
                                        style={{ margin: "0 2em" }}
                                        gap='small'>
                                        <Text size='5rem' color='red'>
                                            {match.scores.awayScore}
                                        </Text>
                                        <Text>
                                            {match.scores.awayOvers} overs
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </AccordionPanel>
                    </Accordion>
                ))}
        </div>
    );
};

export default CompletedMatches;
