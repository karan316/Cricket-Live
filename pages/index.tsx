import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import LiveMatch from "../components/LiveMatch";
export interface Team {
    name: String;
    shortName: String;
    isBatting: String;
}

export interface Score {
    awayOvers: String;
    awayScore: String;
    homeOvers: String;
    homeScore: String;
}

export interface Match {
    name: String;
    homeTeam: Team;
    awayTeam: Team;
    scores: Score;
    venue: String;
    status?: String;
    matchSummaryText: String;
    isMatchAbandoned: Boolean;
    isMatchDrawn: Boolean;
}

export default function Home() {
    const [liveMatch, setLiveMatch] = useState<Match>(null);
    const [completedMatches, setCompletedMatches] = useState<Match[]>(null);
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>(null);
    let completedIPLMatches: Match[];
    let upcomingIPLMatches: Match[];
    let liveIPLMatch: Match;

    const url =
        "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php";
    try {
        const { data } = useSWR(
            url,
            async (url: string) =>
                await axios({
                    method: "GET",
                    url:
                        "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matchseries.php",
                    headers: {
                        "content-type": "application/octet-stream",
                        "x-rapidapi-host":
                            process.env.NEXT_PUBLIC_RAPID_API_HOST,
                        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
                        useQueryString: true,
                    },
                    params: {
                        seriesid: "2514",
                    },
                }).then((response: AxiosResponse) => response.data)
        );
        let matches = [];
        if (data) {
            ({
                matchList: { matches },
            } = data);

            console.log("Matches: ", matches);
            if ((match) => match.status === "COMPLETED") {
                completedIPLMatches = matches
                    .filter((match) => match.status === "COMPLETED")
                    .map(
                        ({
                            awayTeam,
                            name,
                            homeTeam,
                            isMatchDrawn,
                            isMatchAbandoned,
                            matchSummaryText,
                            venue,
                            scores,
                        }) => ({
                            name,
                            homeTeam,
                            awayTeam,
                            isMatchDrawn,
                            isMatchAbandoned,
                            matchSummaryText,
                            venue,
                            scores,
                        })
                    );
                console.log("Completed: ", completedIPLMatches);
            } else {
                console.log("No matches completed");
            }
            if ((match) => match.status === "UPCOMING") {
                upcomingIPLMatches = matches
                    .filter((match) => match.status === "UPCOMING")
                    .map(
                        ({
                            awayTeam,
                            name,
                            homeTeam,
                            isMatchDrawn,
                            isMatchAbandoned,
                            matchSummaryText,
                            venue,
                            scores,
                        }) => ({
                            name,
                            homeTeam,
                            awayTeam,
                            isMatchDrawn,
                            isMatchAbandoned,
                            matchSummaryText,
                            venue,
                            scores,
                        })
                    );
                console.log("Upcoming: ", upcomingIPLMatches);
            } else {
                console.log("No upcoming matches");
            }

            if (matches.find((match) => match.status === "LIVE")) {
                liveIPLMatch = (({
                    name,
                    homeTeam,
                    awayTeam,
                    isMatchDrawn,
                    isMatchAbandoned,
                    matchSummaryText,
                    venue,
                    scores,
                }) => ({
                    name,
                    homeTeam,
                    awayTeam,
                    isMatchDrawn,
                    isMatchAbandoned,
                    matchSummaryText,
                    venue,
                    scores,
                }))(matches.find((match) => match.status === "LIVE"));
                console.log("LIVE: ", liveIPLMatch);
            } else {
                console.log("No LIVE matches at the moment");
            }
        }
    } catch (error) {
        console.error(error);
    }

    useEffect(() => {
        setCompletedMatches(completedIPLMatches);
        setUpcomingMatches(upcomingIPLMatches);
        setLiveMatch(liveIPLMatch);
    }, []);
    return <LiveMatch liveMatch={liveIPLMatch} />;
}
