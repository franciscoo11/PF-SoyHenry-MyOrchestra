export interface UserDb{
    id: number
    name?: string;
    email?: string;
    avatar?: string;
    banner?: string;
    isActive: boolean;
    orchestra_id: number;
    comment_id: number;
    birth_date: string;
    city: string;
    rol: string;
    reactions?: number;
    donations_done: number;
    favorites: number;
    firstTime: boolean;
}

export interface User{
    name?: string;
    email?: string;
    avatar?: string;
    picture?: string;
    rol?: string
}

export interface UpdateUser{
    name: String;
    email: String;
}
