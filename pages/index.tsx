import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import useSWR from "swr";
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
                    url: url,
                    headers: {
                        "content-type": "application/octet-stream",
                        "x-rapidapi-host":
                            process.env.NEXT_PUBLIC_RAPID_API_HOST,
                        "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
                        useQueryString: true,
                    },
                    params: {
                        completedlimit: "5",
                        inprogresslimit: "5",
                        upcomingLimit: "5",
                    },
                }).then((response: AxiosResponse) => response.data)
        );
        let matches = [];
        if (data) {
            ({
                matchList: { matches },
            } = data);

            console.log("Matches: ", matches);
            {
                matches
                    ? (completedIPLMatches = matches
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
                          ))
                    : (completedIPLMatches = []);
            }
            {
                matches
                    ? (upcomingIPLMatches = matches
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
                          ))
                    : (upcomingIPLMatches = []);
            }

            {
                matches
                    ? (liveIPLMatch = (({
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
                      }))(
                          matches.find(
                              (match) =>
                                  match.series.id === 2514 &&
                                  match.status === "LIVE"
                          )
                      ))
                    : (liveIPLMatch = null);
            }
            console.log("Completed: ", completedIPLMatches);
            console.log("LIVE: ", liveIPLMatch);
            console.log("Upcoming: ", upcomingIPLMatches);
        }
    } catch (error) {
        console.error(error);
    }
    // setCompletedMatches(completedIPLMatches);
    // setUpcomingMatches(upcomingIPLMatches);
    // setLiveMatches(liveIPLMatches);

    return <div>Home</div>;
}
