export interface Claim {
    id: number;
    code: string;
    business: string;
    reason: string;
    description: string;
    email_client: string;
    created_at: Date;
    last_status: StatusClaim;
}

export interface ClaimDetail extends Claim {
    statuses: StatusClaim[];
}


export interface StatusClaim {
    id: number;
    code_claim: string;
    status: string;
    comment_adviser: string;
    created_at: Date;
}
