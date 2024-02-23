import { FC } from 'react';
interface TitleDescriptionProps {
    text: string;
}
export const TitleDescription: FC<TitleDescriptionProps> = ({ text }) => {
    return (
        <h2 className="text-lg font-bold leading-[18px] -tracking-[0.36px] text-fogWhite md:text-xl md:leading-[20px] md:-tracking-[0.4px]">
            {text}
        </h2>
    );
};
