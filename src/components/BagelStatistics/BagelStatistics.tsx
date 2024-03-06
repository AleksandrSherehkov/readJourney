import { FC } from 'react';

import { InfoBook } from '@/utils/definitions';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface BagelStatisticsProps {
    selectBook: InfoBook;
}

export const BagelStatistics: FC<BagelStatisticsProps> = ({ selectBook }) => {
    const { totalPages } = selectBook;

    const lastSessionIndex = selectBook.progress?.length
        ? selectBook.progress.length - 1
        : 0;

    const pagesRead = selectBook?.progress?.[lastSessionIndex]?.finishPage || 0;

    const percentage = (pagesRead / totalPages) * 100;
    const text = '100';

    return (
        <div className=" mt-5 flex w-full flex-col items-center justify-center   rounded-xl bg-mediumGrey p-5 md:p-[28px] xl:p-5">
            <div className=" flex size-[116px]    md:size-[138px] xl:size-[189px] ">
                <CircularProgressbar
                    value={percentage}
                    text={`${text}%`}
                    strokeWidth={10}
                    styles={{
                        text: {
                            fill: '#F9F9F9',
                            fontWeight: 700,
                            fontSize: '20px',
                            lineHeight: '20px',
                            letterSpacing: '-0.4px',
                        },
                        path: {
                            strokeLinecap: 'round',
                            stroke: `#30B94D`,
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                        },
                        trail: {
                            stroke: '#1F1F1F',
                        },
                    }}
                />
            </div>
            <div className="mb-1 mt-4 flex items-center justify-center gap-x-[15px] md:mb-2 xl:mt-[10px]">
                <span className="size-[14px] rounded bg-lightGreen md:size-4           "></span>
                <p className="text-[14px] font-medium  leading-[18px] -tracking-[0.28px] text-fogWhite md:text-xl/5  md:-tracking-[0.4px]">
                    {percentage.toFixed(2)}%
                </p>
            </div>
            <p className="file: text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-lightGrey md:text-xs/[14px]  md:-tracking-[0.24px]">
                {pagesRead} pages read
            </p>
        </div>
    );
};
