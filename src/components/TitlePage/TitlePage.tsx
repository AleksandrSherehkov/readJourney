import { FC } from 'react';

interface TitlePageProps {
    text: string;
}

export const TitlePage: FC<TitlePageProps> = ({ text }) => {
    return (
        <h2 className="text-xl font-bold leading-[20px] -tracking-[0.4px] text-fogWhite md:text-[28px] md:leading-[232x] md:-tracking-[0.56px]">
            {text}
        </h2>
    );
};
