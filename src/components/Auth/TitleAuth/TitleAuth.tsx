import { FC } from 'react';

interface TitleAuthProps {
    text: string;
    span: string;
}

export const TitleAuth: FC<TitleAuthProps> = ({ text, span }) => {
    return (
        <h1 className="mb-5 mt-10 text-[32px] font-bold leading-8 tracking-titleForm text-fogWhite md:mb-10 md:mt-[157px] md:text-[64px] md:leading-[60px] md:tracking-titleFormTablet xl:mt-[107px]">
            {text} <span className="text-grey"> {span}</span>
        </h1>
    );
};
