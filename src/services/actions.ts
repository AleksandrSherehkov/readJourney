'use server';

import { signIn, signOut } from '../../auth';
import { AuthError } from 'next-auth';
import { signUp } from './api';
import { SignupParams } from '@/utils/definitions';

const INVALID_CREDENTIALS_MESSAGE = '*Invalid credentials.';
const CHECK_INPUT_MESSAGE = '*Check input data login/password';

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
