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
import {
    AddBookIdParams,
    DeleteReadingParams,
    FormState,
    ReadingState,
    SignupParams,
} from '@/utils/definitions';
import { bookSchema, readingSchema } from '@/utils/validationSchema';

const INVALID_CREDENTIALS_MESSAGE = '*Invalid credentials.';
const CHECK_INPUT_MESSAGE = '*Email or password invalid';

export async function registerNewUser(
    prevState: string | undefined,
    formData: FormData,
): Promise<string | undefined> {
    const params: SignupParams = {
        name: formData.get('name') as string | undefined,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const result = await signUp(params);
    if (result.success) {
        await signIn('credentials', {
            email: params.email,
            password: params.password,
        });
        return '';
    } else {
        return result.data.toString();
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
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
                return INVALID_CREDENTIALS_MESSAGE;
            } else {
                return CHECK_INPUT_MESSAGE;
            }
        }
        throw error;
    }
}

export const addBookToLibrary = async (params: AddBookIdParams) => {
    const { _id, title } = params;
    try {
        const ownerBooks = await getOwnBooks();

        if (!ownerBooks.some(book => book.title === title)) {
            const data = await addBookById(_id);
            revalidatePath('/library');

            return { success: true, data };
        } else {
            return { success: false, error: 'Such book already exists' };
        }
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'An unknown error occurred';
        return { success: false, error: message };
    }
};

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
    prevState: ReadingState,
    formData: FormData,
): Promise<ReadingState> => {
    const id = formData.get('id');
    const page = formData.get('page');

    if (id === null || page === null) {
        return {
            ...prevState,
            message: 'errors',
            error: 'ID or page is missing',
        };
    }

    const data = {
        id,
        page: Number(page),
    };

    const validatedFields = readingSchema.safeParse(data);
    if (!validatedFields.success) {
        const errorsString = Object.entries(
            validatedFields.error.flatten().fieldErrors,
        )
            .map(([key, errors]) => `${key}: ${errors.join(', ')}`)
            .join('; ');
        return {
            ...prevState,
            message: 'errors',
            error: errorsString,
        };
    }

    await startReadingBook(data);
    revalidatePath('/reading');

    return {
        ...prevState,
        message: 'success',
        error: '',
    };
};

export const finishReading = async (
    prevState: ReadingState,
    formData: FormData,
): Promise<ReadingState> => {
    const id = formData.get('id');
    const page = formData.get('page');

    if (id === null || page === null) {
        return {
            ...prevState,
            message: 'errors',
            error: 'ID or page is missing',
        };
    }

    const data = {
        id,
        page: Number(page),
    };

    const validatedFields = readingSchema.safeParse(data);
    if (!validatedFields.success) {
        const errorsString = Object.entries(
            validatedFields.error.flatten().fieldErrors,
        )
            .map(([key, errors]) => `${key}: ${errors.join(', ')}`)
            .join('; ');
        return {
            ...prevState,
            message: 'errors',
            error: errorsString,
        };
    }

    try {
        const dataBookReadingFinish = await finishReadingBook(data);
        if (!dataBookReadingFinish) {
            return {
                ...prevState,
                message: 'error',
                error: 'There was an error finishing the book reading.',
            };
        }

        revalidatePath('/reading');

        return {
            ...prevState,
            message: 'success',
            error: '',
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                ...prevState,
                message: 'error',
                error: error.message,
            };
        }
        return {
            ...prevState,
            message: 'error',
            error: 'An unexpected error occurred',
        };
    }
};

export async function deleteBookByIdReading(params: DeleteReadingParams) {
    console.log(`params:`, params);
    await deleteReading(params);
    revalidatePath('/reading');
}

export async function checkIfBookExists(title: string) {
    const books = await getOwnBooks();
    return books.some(book => book.title === title);
}
