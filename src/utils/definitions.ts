export interface UserResponse {
    email: string;
    name: string;
    token?: string;
    refreshToken?: string;
    _id?: string;
}

export interface BookBase {
    _id: string;
    title: string;
    author: string;
    totalPages: number;
    imageUrl: string;
    recommend?: boolean;
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
    id?: string;
    title?: string;
    author?: string;
    page?: number | string;
    limit?: number | string;
    total?: number | string;
    bookId?: string;
    startPage?: string;
    finishPage?: string;
    status?: 'unread' | 'in-progress' | 'done';
}

export interface AddBookParams {
    title: string;
    author: string;
    totalPages: number;
}

export interface Progress {
    startPage: number;
    finishPage: number;
    startReading: string;
    finishReading: string;
    speed: number;
    status: 'active' | 'inactive';
    _id: string;
}

export interface OwnBooksParams {
    status?: 'unread' | 'in-progress' | 'done';
    _id: string;
    title: string;
    author: string;
    imageUrl: string;
    totalPages: number;
    owner: string;
    progress: Progress[];
}

export interface ReadingParams {
    id: string | FormDataEntryValue | null | undefined;

    page: string | number | undefined;
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

interface TimeLeftToRead {
    hours: number;
    minutes: number;
    seconds: number;
}
export interface InfoBook {
    _id: string;
    title: string;
    author: string;
    imageUrl: string;
    totalPages: number;
    status: 'unread' | 'in-progress' | 'done';
    owner: string;
    progress: Progress[];
    timeLeftToRead: TimeLeftToRead;
}

export interface FormState {
    message: string;
    errors: {
        title?: string[];
        author?: string[];
        totalPages?: string[];
    };
    data?: {
        title: string;
        author: string;
        totalPages: number;
    };
}

export interface ReadingState {
    message: string;
    data: {
        page: number;
        id: string;
    };
    error: string;
}

export interface AddBookIdParams {
    _id: string;
    title: string;
}
