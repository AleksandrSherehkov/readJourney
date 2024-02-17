import clsx from 'clsx';
import { FC } from 'react';
interface IButtonAuthProps {
    pending: boolean;
    emailValid?: boolean;
    nameValid?: boolean;
    passwordValid?: boolean;
    text?: string;
}
export const ButtonAuth: FC<IButtonAuthProps> = ({
    pending,
    emailValid,
    passwordValid,
    text,
    nameValid = true,
}) => {
    return (
        <button
            aria-disabled={pending}
            disabled={!emailValid || !passwordValid}
            type="submit"
            title={
                !emailValid || !passwordValid ? 'Please fill in all fields' : ''
            }
            className={clsx(
                'rounded-[30px] border-[2px] border-inherit bg-fogWhite px-[44px] py-[11px] text-[14px] font-bold leading-[18px] tracking-textButton text-darkGrey  md:px-[53px] md:py-[15px] md:text-[20px]',
                {
                    'cursor-not-allowed bg-fogWhite opacity-50':
                        !emailValid || !passwordValid || !nameValid,
                    'transition-all duration-300 hover:border-[2px] hover:border-fogWhiteHover hover:bg-inherit hover:text-fogWhite':
                        emailValid && passwordValid && nameValid,
                },
            )}
        >
            {text}
        </button>
    );
};
