import { FC } from 'react';

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset';
    position?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    onClick?: () => void;
}
export const Button: FC<ButtonProps> = ({
    text,
    type = 'submit',
    position = 'start',
    onClick,
}) => {
    return (
        <button
            type={type}
            className={`flex items-center justify-center self-${position} rounded-[30px] border border-fogGrey px-5 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px] `}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
