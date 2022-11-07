export interface UserDb{
    id: number
    name?: string;
    email?: string;
    avatar?: string;
    picture?: string;
    isActive: boolean;
    isAdmin: boolean;
    orchestra_id: number;
    comment_id: number;
    image: string;
    birth_date: string;
    city: string;
    rol: string;
    reactions?: number;
    donations_done: number;
    favorites: number;
}

export interface User{
    id?: number
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