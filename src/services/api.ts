'use server';
import {
    BookResponse,
    DeleteReadingParams,
    InfoBook,
    OwnBooksParams,
    ReadingParams,
    RecommendParams,
    ResponseList,
    SigninParams,
    SignupParams,
    UserResponse,
} from '@/utils/definitions';
import axios from 'axios';
import { handleError } from './errorHandler';
import { auth } from '../../auth';
import { AddBookParams } from './../utils/definitions';

const instance = axios.create({
    baseURL: 'https://readjourney.b.goit.study/api',
});

instance.interceptors.request.use(
    async config => {
        const session = await auth();
        const token = session?.accessToken;

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

export const signUp = async (
    params: SignupParams,
): Promise<{ success: boolean; data: UserResponse | string }> => {
    try {
        const { data } = await instance.post<UserResponse>(
            '/users/signup',
            params,
        );

        return { success: true, data };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (
                error.response?.data.message.includes(
                    'Such email already exists',
                )
            ) {
                return { success: false, data: 'Such email already exists' };
            } else {
                return {
                    success: false,
                    data: 'An error occurred during registration.',
                };
            }
        } else {
            return {
                success: false,
                data: 'An error occurred during registration.',
            };
        }
    }
};

export const signIn = async (params: SigninParams): Promise<UserResponse> => {
    try {
        const { data } = await instance.post<UserResponse>(
            '/users/signin',
            params,
        );

        return data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const getCurrentUser = async (): Promise<UserResponse> => {
    try {
        const { data } = await instance.get<UserResponse>('/users/current');

        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const getCurrentUserRefresh = async (): Promise<UserResponse> => {
    try {
        const { data } = await instance.get<UserResponse>(
            '/users/current/refresh',
        );
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const signOut = async (): Promise<void> => {
    try {
        await instance.post('/users/signout');
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const getRecommendedBooks = async (
    params: RecommendParams,
): Promise<ResponseList<BookResponse>> => {
    try {
        const { data } = await instance.get<ResponseList<BookResponse>>(
            '/books/recommend',
            {
                params,
            },
        );
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const onBookAdd = async (
    params: AddBookParams,
): Promise<BookResponse> => {
    try {
        const { data } = await instance.post<BookResponse>(
            '/books/add',
            params,
        );
        console.log('Book added successfully:', data);
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const addBookById = async (bookId: string): Promise<BookResponse> => {
    try {
        const { data } = await instance.post<BookResponse>(
            `/books/add/${bookId}`,
        );
        console.log('Book added successfully:', data);
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const removeBookById = async (
    bookId: string,
): Promise<{ message: string; id: string }> => {
    try {
        const { data } = await instance.delete<{ message: string; id: string }>(
            `/books/remove/${bookId}`,
        );
        console.log('Book removal successful:', data);
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const getOwnBooks = async (
    params?: OwnBooksParams,
): Promise<BookResponse[]> => {
    try {
        const { data } = await instance.get<BookResponse[]>('/books/own', {
            params,
        });

        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const startReadingBook = async (
    params: ReadingParams,
): Promise<BookResponse> => {
    try {
        const { data } = await instance.post<BookResponse>(
            '/books/reading/start',
            params,
        );
        console.log('Start reading book successful:');
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const finishReadingBook = async (
    params: ReadingParams,
): Promise<BookResponse> => {
    try {
        const { data } = await instance.post<BookResponse>(
            '/books/reading/finish',
            params,
        );
        console.log('Finish reading book successful:', data);
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const deleteReading = async (
    params: DeleteReadingParams,
): Promise<BookResponse> => {
    try {
        const { data } = await instance.delete<BookResponse>(
            `/books/reading/`,
            { params },
        );
        console.log('Reading deletion successful:', data);
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};

export const getBookDetails = async (bookId: string): Promise<InfoBook> => {
    try {
        const { data } = await instance.get<InfoBook>(`/books/${bookId}`);
        console.log('Fetched book details successfully:');
        return data;
    } catch (error: unknown) {
        handleError(error);
        throw error;
    }
};
