export type StatusClaim = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'info';

const CLAIM_STATUS:  Record<StatusClaim, string> = {
    pending: 'Pendiente',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    cancelled: 'Cancelado',
    info: 'Informado',
} as const;

const CLAIM_STATUS_COLOR: Record<StatusClaim, string> = {
    pending: 'secondary',
    approved: 'success',
    rejected: 'warn',
    cancelled: 'danger',
    info: 'contrast',
} as const;

export { CLAIM_STATUS, CLAIM_STATUS_COLOR };
