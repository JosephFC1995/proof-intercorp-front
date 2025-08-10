export interface SummaryResponse {
    totalClaims: number;
    totalsByLatestStatus: TotalsByLatestStatus[];
}

export interface TotalsByLatestStatus {
    status: string;
    total: number;
}
