import { useState } from 'react';
import { emailZodShema } from '@/utils/validationSchema';

export const useEmailValidation = () => {
    const [emailValid, setEmailValid] = useState(false);

    const validateEmail = (value: string) => {
        const result = emailZodShema.safeParse(value);
        setEmailValid(result.success);
        return result.success ? '' : result.error.errors[0].message;
    };

    return { emailValid, validateEmail };
};
