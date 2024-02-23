import { BookResponse, OwnBooksParams, Progress } from '@/utils/definitions';
import Image from 'next/image';
import { FC } from 'react';
import { BiSquareRounded } from 'react-icons/bi';
import { LuTrash2 } from 'react-icons/lu';
import line from '../../../public/assets/image/block.png';

interface DiaryReadingProps {
    selectBook: OwnBooksParams | BookResponse;
}

export const DiaryReading: FC<DiaryReadingProps> = ({ selectBook }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const progressByDate: Record<string, Progress[]> = {};

    selectBook.progress?.forEach(entry => {
        const dateKey = formatDate(entry.startReading);
        if (!progressByDate[dateKey]) {
            progressByDate[dateKey] = [];
        }
        progressByDate[dateKey].push(entry);
    });

    return (
        <ul className="custom-scrollbar mt-5 flex h-auto max-h-[211px] min-w-[295px] flex-col  rounded-xl bg-mediumGrey  py-4 pl-[23px] pr-4 md:max-h-[252px] xl:max-h-[373px]">
            <div className="h-full w-full  border-l-2 border-darkGrey pl-4 md:pl-5">
                {Object.entries(progressByDate).map(([date, entries]) => {
                    // Calculate the total pages read for each date
                    const totalPagesRead = entries.reduce(
                        (total, current) =>
                            total +
                            (current.finishPage - current.startPage + 1),
                        0,
                    );
                    return (
                        <li
                            key={date}
                            className="flex w-full flex-col items-center "
                        >
                            <div className="flex w-full items-center justify-between">
                                <div className=" relative flex items-center justify-between ">
                                    <BiSquareRounded className="absolute -left-[25px] size-4 bg-darkGrey stroke-fogWhite stroke-2 md:-left-[31px] md:size-5" />
                                    <p className="text-xs font-bold  leading-[16px] -tracking-[0.24px] text-fogWhite md:text-base md:leading-[18px] md:-tracking-[0.32px]">
                                        {date}
                                    </p>
                                </div>
                                <p className="ml-auto text-xs font-medium leading-[16px] -tracking-[0.24px] text-lightGrey md:text-sm md:leading-[18px] md:-tracking-[0.28px]">
                                    {totalPagesRead} pages
                                </p>
                            </div>
                            <ul className="w-full">
                                {entries.map(entry => (
                                    <li key={entry._id} className="w-full">
                                        <div className="flex w-full items-center justify-between">
                                            <p className="text-sm/[18px] font-medium   -tracking-[0.28px] text-fogWhite md:text-xl/5  md:-tracking-[0.4px]">
                                                {(
                                                    ((entry.finishPage -
                                                        entry.startPage) /
                                                        selectBook.totalPages) *
                                                    100
                                                ).toFixed(2)}{' '}
                                                %
                                            </p>
                                            <div className=" flex items-center gap-1.5">
                                                <Image
                                                    src={line}
                                                    width={59}
                                                    height={25}
                                                    alt="Line"
                                                    className="h-[18px] w-[43px] md:h-[25px] md:w-[59px]"
                                                />
                                                <button>
                                                    <LuTrash2 className="size-[14px]" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-lightGrey md:text-xs/[14px]   md:-tracking-[0.24px]">
                                                {(
                                                    (new Date(
                                                        entry.finishReading,
                                                    ).getTime() -
                                                        new Date(
                                                            entry.startReading,
                                                        ).getTime()) /
                                                    60000
                                                ).toFixed(2)}{' '}
                                                minutes
                                            </p>
                                            <p className="w-[43px] text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-lightGrey md:text-xs/[14px]   md:-tracking-[0.24px]">
                                                {entry.speed} pages per hour
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </div>
        </ul>
    );
};
