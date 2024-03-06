import { FC } from 'react';

interface RecommendedDescriptionItemProps {
    number: string;
    spanText: string;
    text: string;
}

export const RecommendedDescriptionItem: FC<
    RecommendedDescriptionItemProps
> = ({ number, spanText, text }) => {
    return (
        <li className="flex items-start gap-x-3">
            <span className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-fogWhite text-lg font-bold leading-[18px] -tracking-[0.36px] text-darkGrey md:size-11 md:text-xl md:leading-5 md:-tracking-[0.4px]">
                {number}
            </span>
            <p className="text-sm font-medium leading-[18px] -tracking-[0.28px] text-lightGrey">
                <span className="text-fogWhite">{spanText}</span> {text}
            </p>
        </li>
    );
};
