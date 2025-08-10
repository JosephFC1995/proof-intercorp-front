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
    email_adviser: string;
    created_at: Date;
}

export interface FileClaim {
    id: number;
    code_claim: string;
    name_file: string;
    url_file: string;
    type_content: string;
    size_bytes: number;
    created_at: Date;
}
