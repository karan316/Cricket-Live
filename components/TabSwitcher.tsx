import React, { useState } from "react";
import { Box, Grommet, Tab, Tabs, Text, ThemeType } from "grommet";
import { Down, Up } from "grommet-icons";
import CompletedMatches from "./CompletedMatches";
import { Match } from "../interfaces";
import UpcomingMatches from "./UpcomingMatches";
import LiveMatch from "./LiveMatch";
import { Colors } from "grommet/themes/base";

const colors: Colors = {
    text: {
        dark: "#000000",
        light: "#000000",
    },
    "active-text": "#8b00cc",
    border: undefined,
    focus: "transparent",
    "status-disabled": "#efefef",
    "accent-1": "#8b00cc",
    "accent-2": "#18e7ba",
};

const customTheme: ThemeType = {
    global: {
        colors: colors,
        elevation: {
            light: {
                small: "0px 1px 5px rgba(0, 0, 0, 0.50)",
                medium: "0px 3px 8px rgba(0, 0, 0, 0.50)",
            },
        },
    },
    tab: {
        border: undefined,
        disabled: {
            color: "text-weak",
        },
        color: colors.text,
        active: {
            color: colors.brand,
        },
        hover: {
            color: colors.brand,
        },
        margin: {
            horizontal: "10rem",
        },
        pad: {
            top: "0.5em",
            bottom: "0.8em",
        },
    },
    tabs: {
        header: {
            border: undefined,
        },
    },
    accordion: {
        heading: {
            level: "4",
            margin: { vertical: "6px", horizontal: "24px" },
        },
        panel: {
            border: { color: "#ffffff" },
        },
        hover: {
            heading: { color: "dark-3" },
        },
        icons: {
            collapse: Up,
            expand: Down,
            color: "dark-1",
        },
        border: undefined,
    },
};

interface TabProps {
    loading: Boolean;
    matches: {
        completedIPLMatches: Match[];
        upcomingIPLMatches: Match[];
        liveIPLMatch: Match;
    };
}

const TabSwitcher: React.FC<TabProps> = ({ matches, loading }) => {
    const { completedIPLMatches, upcomingIPLMatches, liveIPLMatch } = matches;
    const [index, setIndex] = useState(0);
    const onActive = (nextIndex) => setIndex(nextIndex);
    return (
        <Grommet theme={customTheme}>
            <Box gap='large' pad='large'>
                <Box border gap='medium' pad='medium'>
                    <Text weight='bold'>IPL 2020</Text>
                    <Tabs activeIndex={index} onActive={onActive}>
                        <Tab title='Completed'>
                            <CompletedMatches
                                matches={completedIPLMatches}
                                loading={loading}
                            />
                        </Tab>
                        <Tab title='LIVE' disabled>
                            <LiveMatch match={liveIPLMatch} loading={loading} />
                        </Tab>
                        <Tab title='Upcoming'>
                            <UpcomingMatches
                                matches={upcomingIPLMatches}
                                loading={loading}
                            />
                        </Tab>
                    </Tabs>
                </Box>
            </Box>
        </Grommet>
    );
};

export default TabSwitcher;
