'use server';

import {
    deleteReading,
    finishReadingBook,
    getOwnBooks,
    onBookAdd,
    removeBookById,
    startReadingBook,
} from '@/services/api';
import { revalidatePath } from 'next/cache';

import { signIn, signOut } from '../../auth';
import { AuthError } from 'next-auth';
import { addBookById, signUp } from './api';
import { DeleteReadingParams, SignupParams } from '@/utils/definitions';
import { bookSchema, readingSchema } from '@/utils/validationSchema';

const INVALID_CREDENTIALS_MESSAGE = '*Invalid credentials.';
const CHECK_INPUT_MESSAGE = '*Email or password invalid';

interface FormStateReading {
    message: string;
    data?: {
        page: number;
        id: string;
    };
    errors: {
        page?: string[];
    };
}

interface FormState {
    message: string;
    errors: {
        title?: string[] | undefined;
        author?: string[] | undefined;
        totalPages?: string[] | undefined;
    };
    data?: {
        title: string;
        author: string;
        totalPages: number;
    };
}

export async function registerNewUser(
    prevState: string | undefined,
    formData: FormData,
) {
    const params: SignupParams = {
        name: formData.get('name') as string | undefined,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    try {
        await signUp(params);
        await signIn('credentials', {
            email: params.email,
            password: params.password,
        });
    } catch (error) {
        console.log(error);

        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                console.log(error.type);

                return INVALID_CREDENTIALS_MESSAGE;
            } else {
                return CHECK_INPUT_MESSAGE;
            }
        }
        throw error;
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        console.log(error);

        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                return INVALID_CREDENTIALS_MESSAGE;
            } else {
                return CHECK_INPUT_MESSAGE;
            }
        }
        throw error;
    }
}

export async function signOutUser() {
    try {
        await signOut();
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                console.log(error.type);

                return INVALID_CREDENTIALS_MESSAGE;
            } else {
                return CHECK_INPUT_MESSAGE;
            }
        }
        throw error;
    }
}
interface Params {
    _id: string;
    title: string;
}

export async function addBookToLibrary(params: Params) {
    const { _id, title } = params;
    const ownerBooks = await getOwnBooks();

    if (!ownerBooks.some(book => book.title === title)) {
        const data = await addBookById(_id);
        revalidatePath('/library');

        console.log('Book is added');
        return data;
    } else {
        console.log(`Book is already in the library`);
        return null;
    }
}

export const createBook = async (
    prevState: FormState,
    formData: FormData,
): Promise<FormState> => {
    const data = {
        title: formData.get('bookTitle') as string,
        author: formData.get('author') as string,
        totalPages: Number(formData.get('numberPages')),
    };

    const bookExists = await checkIfBookExists(data.title);
    if (bookExists) {
        return {
            message: 'errors',
            errors: {
                title: ['Book already exists'],
            },
        };
    }

    const validatedFields = bookSchema.safeParse(data);
    if (!validatedFields.success) {
        return {
            message: 'errors',
            errors: validatedFields.error?.flatten()?.fieldErrors,
        };
    }

    await onBookAdd(data);
    revalidatePath('/library');

    return {
        message: 'success',
        errors: {},
        data: {
            title: data.title,
            author: data.author,
            totalPages: data.totalPages,
        },
    };
};

export async function deleteBookById(id: string) {
    await removeBookById(id);

    revalidatePath('/library');
}

export const startReading = async (
    prevState: FormStateReading,
    formData: FormData,
) => {
    const data = {
        id: formData.get('id'),
        page: Number(formData.get('page')),
    };

    const validatedFields = readingSchema.safeParse(data);
    if (!validatedFields.success) {
        return {
            message: 'errors',
            errors: validatedFields.error?.flatten()?.fieldErrors,
        };
    }

    const dataBookReading = await startReadingBook(data);

    revalidatePath('/reading');

    return {
        message: 'success',
        errors: {},
        dataBookReading,
    };
};

export const finishReading = async (
    prevState: FormStateReading,
    formData: FormData,
) => {
    const data = {
        id: formData.get('id'),
        page: Number(formData.get('page')),
    };

    const validatedFields = readingSchema.safeParse(data);
    if (!validatedFields.success) {
        return {
            message: 'errors',
            errors: validatedFields.error?.flatten()?.fieldErrors,
        };
    }

    const dataBookReadingFinish = await finishReadingBook(data);

    revalidatePath('/reading');

    return {
        message: 'success',
        errors: {},
        dataBookReadingFinish,
    };
};

export async function deleteBookByIdReading(params: DeleteReadingParams) {
    await deleteReading(params);
    revalidatePath('/reading');
}

export async function checkIfBookExists(title: string) {
    const books = await getOwnBooks();
    return books.some(book => book.title === title);
}
