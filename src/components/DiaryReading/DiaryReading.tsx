import { InfoBook, Progress } from '@/utils/definitions';
import Image from 'next/image';
import { FC } from 'react';
import { LuTrash2 } from 'react-icons/lu';
import line from '../../../public/assets/image/block.png';

import { deleteBookByIdReading } from '@/services/actions';

interface DiaryReadingProps {
    selectBook: InfoBook;
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
        <div className="custom-scrollbar -mr-[14px] mt-5 h-full max-h-[211px] rounded-xl pr-2 md:mr-0 md:max-h-[252px] xl:max-h-[373px] ">
            <ul className=" flex min-h-[211px] flex-col rounded-xl bg-mediumGrey p-4 pr-[36px] md:min-h-[252px]">
                {Object.entries(progressByDate)
                    .toReversed()
                    .map(([date, entries], index) => {
                        const totalPagesRead = entries
                            .filter(entry => entry.finishPage)
                            .reduce(
                                (total, current) =>
                                    total +
                                    (current.finishPage -
                                        current.startPage +
                                        1),
                                0,
                            );
                        return (
                            <li key={date} className="relative h-full w-full">
                                <span className="absolute left-[7px] top-0 h-full w-[2px] bg-darkGrey md:left-[9px]"></span>
                                <div className="mb-[17px] flex w-full items-center justify-between">
                                    <div className="flex gap-[9px]">
                                        <div
                                            className={`border-${index === 0 ? 'fogWhite' : 'lightGrey'} z-10 flex size-4 items-center justify-center rounded-[4px] border-[5px] md:-left-[31px] md:size-5`}
                                        >
                                            <div className="size-2 flex-shrink-0 rounded-[2px] bg-lightBlack md:size-3"></div>
                                        </div>
                                        <p
                                            className={`text-${index === 0 ? 'fogWhite' : 'lightGrey'} text-xs font-bold  leading-[16px] -tracking-[0.24px]  md:text-base md:leading-[18px] md:-tracking-[0.32px]`}
                                        >
                                            {date}
                                        </p>
                                    </div>
                                    <p className="text-xs font-medium leading-[16px] -tracking-[0.24px] text-lightGrey md:text-sm md:leading-[18px] md:-tracking-[0.28px]">
                                        {totalPagesRead} pages
                                    </p>
                                </div>
                                <ul className="flex h-full w-full flex-col gap-y-[17px] pl-[25px] md:gap-y-[15px] ">
                                    {entries
                                        .toReversed()
                                        .filter(entry => entry.finishPage)
                                        .map(entry => (
                                            <li
                                                key={entry._id}
                                                className="relative w-full"
                                            >
                                                <div className="mb-1 flex w-full justify-between ">
                                                    <p className="text-sm/[18px] font-medium -tracking-[0.28px] text-fogWhite md:text-xl/5  md:-tracking-[0.4px]">
                                                        {(
                                                            ((entry.finishPage -
                                                                entry.startPage) /
                                                                selectBook.totalPages) *
                                                            100
                                                        ).toFixed(2)}{' '}
                                                        %
                                                    </p>
                                                    <div className="flex items-center gap-1.5">
                                                        <Image
                                                            src={line}
                                                            width={59}
                                                            height={25}
                                                            alt="Line"
                                                            className="h-[18px] w-[43px] md:h-[25px] md:w-[59px]"
                                                        />
                                                        <form
                                                            action={deleteBookByIdReading.bind(
                                                                null,
                                                                {
                                                                    bookId: selectBook._id,
                                                                    readingId:
                                                                        entry._id,
                                                                },
                                                            )}
                                                        >
                                                            <button className="absolute -right-5 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white">
                                                                <LuTrash2 className="size-[14px] transition-transform duration-300 ease-in-out hover:scale-110 hover:text-white" />
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-lightGrey md:text-xs/[14px]   md:-tracking-[0.24px]">
                                                        {Math.ceil(
                                                            (new Date(
                                                                entry.finishReading,
                                                            ).getTime() -
                                                                new Date(
                                                                    entry.startReading,
                                                                ).getTime()) /
                                                                60000,
                                                        )}{' '}
                                                        minutes
                                                    </p>
                                                    <p className="pt-[3px] text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-lightGrey md:text-xs/[14px]   md:-tracking-[0.24px]">
                                                        {entry.speed} pages
                                                        <br /> per hour
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};
