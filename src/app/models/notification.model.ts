export enum Role {
    MANAGER = 'MANAGER',
    EVALUATEUR = 'EVALUATEUR'
}

export interface Notification {
    id : number;
    message: string;
    evaluateur: Role;
}

