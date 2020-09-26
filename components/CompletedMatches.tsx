import React, { useEffect, useState } from "react";
import { Match } from "../interfaces";
import { Accordion, AccordionPanel, Box, Text } from "grommet";
import Loading from "../assets/svg/loading.svg";
import MI from "../assets/svg/mi.svg";
import CSK from "../assets/svg/csk.svg";
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
                    <Accordion animate={true} multiple={true} key={match.name}>
                        <AccordionPanel
                            label={
                                <Box
                                    pad='medium'
                                    // background='white'
                                    round='small'
                                    direction='row'
                                    width='80em'
                                    justify='between'
                                    // align='stretch'
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
                                        <MI />
                                    </Box>
                                    <Box pad='small' width='2em' responsive>
                                        VS
                                    </Box>
                                    <Box
                                        pad='xsmall'
                                        width='16em'
                                        responsive
                                        style={{ placeItems: "center" }}>
                                        <CSK />
                                    </Box>
                                    <Box pad='small' responsive>
                                        {new Date(match.startDateTime)
                                            .toUTCString()
                                            .slice(0, 16)}
                                    </Box>
                                </Box>
                            }
                            style={{ border: "none", height: "6em" }}>
                            <Box>
                                <Text>Match Summary</Text>
                            </Box>
                        </AccordionPanel>
                    </Accordion>
                ))}
        </div>
    );
};

export default CompletedMatches;
