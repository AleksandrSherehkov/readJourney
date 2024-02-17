import { useState } from 'react';
import { nameZodShema } from '@/utils/validationSchema';

export const useNameValidation = () => {
    const [nameValid, setNameValid] = useState(false);

    const validateName = (value: string) => {
        const result = nameZodShema.safeParse(value);
        setNameValid(result.success);
        return result.success ? '' : result.error.errors[0].message;
    };

    return { nameValid, validateName };
};
