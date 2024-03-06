import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';
import { signIn as apiSignIn, signOut as apiSignOut } from '@/services/api';
import { emailZodShema, passwordZodShema } from '@/utils/validationSchema';
declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module 'next-auth' {
    interface User {
        token?: string;
        refreshToken?: string;
    }

    interface Session {
        accessToken?: string;
        refreshToken?: string;
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: emailZodShema,
                        password: passwordZodShema,
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await apiSignIn({ email, password });

                    if (!user) return null;
                    return user;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.accessToken = user.token;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken ?? '';
            session.refreshToken = token.refreshToken ?? '';
            return session;
        },
    },
    events: {
        signOut: async () => {
            try {
                await apiSignOut();
                console.log('Custom signOut success');
            } catch (error) {
                console.error('Custom signOut failed:', error);
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
