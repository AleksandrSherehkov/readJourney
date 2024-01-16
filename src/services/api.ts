import {
  AddBookParams,
  BookResponse,
  DeleteReadingParams,
  FinishReadingParams,
  OwnBooksParams,
  RecommendParams,
  ResponseList,
  SigninParams,
  SignupParams,
  StartReadingParams,
  UserResponse,
} from '@/utils/definitions';
import axios, { AxiosError } from 'axios';
import { handleError } from './errorHandler';

const instance = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api',
});

export const signup = async (params: SignupParams): Promise<UserResponse> => {
  try {
    const { data } = await instance.post<UserResponse>('/users/signup', params);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const signin = async (params: SigninParams): Promise<UserResponse> => {
  try {
    const { data } = await instance.post<UserResponse>('/users/signin', params);
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

export const signout = async (): Promise<void> => {
  try {
    await instance.post('/users/signout');
    console.log('Sign out success');
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const getRecommendedBooks = async (
  params: RecommendParams
): Promise<ResponseList<BookResponse>> => {
  try {
    const { data } = await instance.get<ResponseList<BookResponse>>('/books/recommend', {
      params,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTZkZGNmZDBmNzAwMmMwN2FkODk4MyIsImlhdCI6MTcwNTQzNDU3NSwiZXhwIjoxNzA1NTE3Mzc1fQ.2isaOLvr27dwVbkp5UrJd1e6hZwOQVIh4gSzSqAjaH4',
      },
    });
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const addBook = async (params: AddBookParams): Promise<BookResponse> => {
  try {
    const { data } = await instance.post<BookResponse>('/books/add', params);
    console.log('Book added successfully:', data);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const addBookById = async (bookId: string): Promise<BookResponse> => {
  try {
    const { data } = await instance.post<BookResponse>(`/books/add/${bookId}`);
    console.log('Book added successfully:', data);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const removeBookById = async (bookId: string): Promise<{ message: string; id: string }> => {
  try {
    const { data } = await instance.delete<{ message: string; id: string }>(
      `/books/remove/${bookId}`
    );
    console.log('Book removal successful:', data);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const getOwnBooks = async (params?: OwnBooksParams): Promise<ResponseList<BookResponse>> => {
  try {
    const { data } = await instance.get<ResponseList<BookResponse>>('/books/own', { params });
    console.log('Fetched user books successfully:', data);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const startReadingBook = async (params: StartReadingParams): Promise<BookResponse> => {
  try {
    const { data } = await instance.post<BookResponse>('/books/reading/start', params);
    console.log('Start reading book successful:', data);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const finishReadingBook = async (params: FinishReadingParams): Promise<BookResponse> => {
  try {
    const { data } = await instance.post<BookResponse>('/books/reading/finish', params);
    console.log('Finish reading book successful:', data);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const deleteReading = async (params: DeleteReadingParams): Promise<BookResponse> => {
  try {
    const { data } = await instance.delete<BookResponse>(
      `/books/reading/${params.bookId}/${params.readingId}`
    );
    console.log('Reading deletion successful:', data);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};

export const getBookDetails = async (bookId: string): Promise<BookResponse> => {
  try {
    const { data } = await instance.get<BookResponse>(`/books/${bookId}`);
    console.log('Fetched book details successfully:', data);
    return data;
  } catch (error: unknown) {
    handleError(error);
    throw error;
  }
};
