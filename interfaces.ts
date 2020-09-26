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

export interface Venue {
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
    startDateTime: string;
}
