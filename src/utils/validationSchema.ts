import { emailValidator } from './regexp';

import { z } from 'zod';

export const nameZodShema = z
    .string({ required_error: '*Name is required' })
    .min(1, { message: '*Name is required' });

export const emailZodShema = z
    .string({ required_error: '*Email is required' })
    .min(1, { message: '*Email is required' })
    .regex(emailValidator, {
        message: '*Please enter a valid email address"',
    });

export const passwordZodShema = z
    .string({
        required_error: '*Password is required',
    })
    .min(1, { message: '*Password is required' })
    .min(7, { message: '*Password must be at least 7 characters' });

export const bookSchema = z.object({
    title: z.string().min(1, 'Title must be required').max(100),
    author: z.string().min(1, 'The author must be required').max(100),
    totalPages: z.number().gt(0, 'Pages should be more than 0 '),
});

export const readingSchema = z.object({
    page: z.number().gt(0, 'Page should be more than 0 '),
    id: z.string().min(1, 'Id must be required').max(100),
});
