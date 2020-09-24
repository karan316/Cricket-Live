import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import LiveMatch from "../components/LiveMatch";
import CompletedMatches from "../components/CompletedMatches";
import UpcomingMatches from "../components/UpcomingMatches";
export interface Team {
    name: string;
    shortName: string;
    isBatting: string;
}

export interface Score {
    awayOvers: string;
    awayScore: string;
    homeOvers: string;
    homeScore: string;
}

interface Venue {
    name: string;
    shortName: string;
}
export interface Match {
    name: string;
    homeTeam: Team;
    awayTeam: Team;
    scores: Score;
    venue: Venue;
    status?: string;
    matchSummaryText: string;
    isMatchAbandoned: Boolean;
    isMatchDrawn: Boolean;
}

export default function Home() {
    let loading: Boolean = true;

    let completedIPLMatches: Match[];
    let upcomingIPLMatches: Match[];
    let liveIPLMatch: Match;

    const url =
        "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matchseries.php";
    const { data, error } = useSWR(
        url,
        async (url: string) =>
            await axios({
                method: "GET",
                url: url,
                headers: {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
                    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
                    useQueryString: true,
                },
                params: {
                    seriesid: "2514",
                },
            }).then((response: AxiosResponse) => response.data)
    );
    if (error) {
        console.error("Error: ", error);
    }
    let matches = [];
    if (data) {
        ({
            matchList: { matches },
        } = data);
        loading = false;
    }

    completedIPLMatches = matches.filter(
        (match) => match.status === "COMPLETED"
    );
    if (completedIPLMatches) {
        completedIPLMatches = completedIPLMatches.map(
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
    upcomingIPLMatches = matches.filter((match) => match.status === "UPCOMING");
    if (upcomingIPLMatches) {
        upcomingIPLMatches = upcomingIPLMatches.map(
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
    liveIPLMatch = matches.find((match) => match.status === "LIVE");
    if (liveIPLMatch) {
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
        }))(liveIPLMatch);
        console.log("LIVE: ", liveIPLMatch);
    } else {
        console.log("No LIVE matches at the moment");
    }

    // return <LiveMatch match={liveIPLMatch} />;
    // return <CompletedMatches matches={completedIPLMatches} loading={loading} />;
    return <UpcomingMatches matches={upcomingIPLMatches} loading={loading} />;
}
