import { useState } from 'react';
import { passwordZodShema } from '@/utils/validationSchema';

export const usePasswordValidation = () => {
    const [passwordValid, setPasswordValid] = useState(false);

    const validatePassword = (value: string) => {
        const result = passwordZodShema.safeParse(value);
        setPasswordValid(result.success);
        return result.success ? '' : result.error.errors[0].message;
    };

    return { passwordValid, validatePassword };
};
