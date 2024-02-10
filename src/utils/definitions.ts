export interface UserResponse {
    email: string;
    name: string;
    token?: string;
    refreshToken?: string;
    id?: string;
}

export interface BookBase {
    _id: string;
    title: string;
    author: string;
    totalPages: number;
    imageUrl: string;
    recommend?: boolean;
}

export interface Progress {
    startPage: number;
    finishPage: number;
    startReading: string;
    finishReading: string;
    speed: number;
    status: string;
}

export interface BookResponse extends BookBase {
    recommend?: boolean;
    status?: 'unread' | 'in-progress' | 'done';
    owner?: string;
    progress?: Progress[];
    timeLeftToRead?: {
        hours: number;
        minutes: number;
        seconds: number;
    };
}

export interface SignupParams {
    name?: string;
    email: string;
    password: string;
}

export interface SigninParams {
    email: string;
    password: string;
}

export interface RecommendParams {
    title?: string;
    author?: string;
    page?: number | string;
    limit?: number | string;
    total?: number | string;
    bookId?: string;
}

export interface AddBookParams {
    title: string;
    author: string;
    totalPages: number;
}

export interface OwnBooksParams {
    status?: 'unread' | 'in-progress' | 'done';
}

export interface StartReadingParams {
    _id: string;
    page: number;
}

export interface FinishReadingParams {
    _id: string;
    page: number;
}

export interface DeleteReadingParams {
    bookId: string;
    readingId: string;
}

export interface ResponseList<T> {
    results: T[];
    totalPages: number;
    page: number;
    perPage: number;
}
