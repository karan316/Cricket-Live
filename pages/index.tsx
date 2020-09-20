import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import _ from "lodash";

async function getData() {
    return await axios({
        method: "GET",
        url: "https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php",
        headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "dev132-cricket-live-scores-v1.p.rapidapi.com",
            "x-rapidapi-key":
                "ba00f54768msh78ca05cabcadb79p11c55djsn57ddeb36eb3d",
            useQueryString: true,
        },
        params: {
            completedlimit: "5",
            inprogresslimit: "5",
            upcomingLimit: "5",
        },
    });
}

interface Team {
    name: String;
    shortName: String;
    isBatting: String;
}

interface Score {
    awayOvers: String;
    awayScore: String;
    homeOvers: String;
    homeScore: String;
}

interface Match {
    name: String;
    homeTeam: Team;
    awayTeam: Team;
    scores: Score;
    venue: String;
    status: String;
    matchSummaryText: String;
    isMatchAbandoned: Boolean;
    isMatchDrawn: Boolean;
}

export default function Home() {
    const [liveMatches, setLiveMatches] = useState<Match>(null);
    const [completedMatches, setCompletedMatches] = useState<Match[]>(null);
    const [upcomingMatches, setUpcomingMatches] = useState<Match[]>(null);
    useEffect(() => {
        async function fetch() {
            try {
                const response: AxiosResponse = await getData();
                const { matches } = response.data.matchList;
                const completedIPLMatches: Match[] = matches
                    .filter(
                        (match) =>
                            match.series.id === 2514 &&
                            match.status === "COMPLETED"
                    )
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
                const upcomingIPLMatches: Match[] = matches
                    .filter(
                        (match) =>
                            match.series.id === 2514 &&
                            match.status === "UPCOMING"
                    )
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
                const liveIPLMatches: Match[] = matches
                    .filter(
                        (match) =>
                            match.series.id === 2514 && match.status === "LIVE"
                    )
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
                console.log("LIVE: ", liveIPLMatches);
                console.log("Upcoming: ", upcomingIPLMatches);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
        return () => {};
    }, []);

    return <div>Home</div>;
}
