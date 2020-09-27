import React, { useEffect, useState } from "react";
import { Match } from "../interfaces";
import { Accordion, AccordionPanel, Box, Text } from "grommet";
import Loading from "../assets/svg/loading.svg";
// import { MI, CSK, RCB, DC, SRH, KKR, KXIP, RR } from "../logo";
import Logo from "./Logo";
import { match } from "assert";
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
                style={{ margin: "15% 50%", width: "4em", height: "4em" }}
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
                        key={match.name}
                        margin='medium'>
                        <AccordionPanel
                            label={
                                <Box
                                    pad='medium'
                                    round='small'
                                    direction='row'
                                    width='80em'
                                    justify='between'
                                    gap='xlarge'
                                    responsive
                                    overflow='auto'
                                    style={{
                                        boxShadow:
                                            "5px 5px 15px rgba(167, 167, 167, 0.25)",
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
                                        <Logo
                                            team={match.homeTeam.shortName.toUpperCase()}
                                        />
                                    </Box>
                                    <Box pad='small' width='2em' responsive>
                                        VS
                                    </Box>
                                    <Box
                                        pad='xsmall'
                                        width='16em'
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
                                <Text>Match Summary</Text>
                            </Box>
                        </AccordionPanel>
                    </Accordion>
                ))}
        </div>
    );
};

export default CompletedMatches;
