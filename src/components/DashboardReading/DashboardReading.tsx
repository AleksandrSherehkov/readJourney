'use client';

import React, { FC, useEffect, useState } from 'react';

import { useFormState } from 'react-dom';
import { finishReading, startReading } from '@/services/actions';

import { BookResponse, OwnBooksParams } from '@/utils/definitions';
import { ProgressStar } from '../ProgressStar/ProgressStar';
import { StatisticsReading } from '../StatisticsReading/StatisticsReading';
import { useRouter } from 'next/navigation';

interface DashboardReadingProps {
    selectBook: OwnBooksParams | BookResponse;
    isActiveProgress: boolean;
    isActiveStatistics?: boolean;
}

export const DashboardReading: FC<DashboardReadingProps> = ({
    selectBook,
    isActiveProgress,
    isActiveStatistics,
}) => {
    console.log(`selectBook:`, selectBook);
    const { replace } = useRouter();

    const lastSessionIndex = selectBook.progress?.length
        ? selectBook.progress.length - 1
        : 0;
    const lastProgress = selectBook.progress?.[lastSessionIndex] ?? {
        startPage: 1,
        finishPage: 1,
    };

    const initialPage =
        lastProgress.startPage > lastProgress.finishPage
            ? lastProgress.startPage
            : lastProgress.finishPage;

    const [pageInput, setPageInput] = useState(initialPage);
    const [startPage, setStartPage] = useState<number>(initialPage);
    const [finishPage, setFinishPage] = useState<number>(initialPage);

    const initialState = {
        message: '',
        data: {
            page: initialPage,
            id: selectBook._id as string | null,
        },
        errors: {
            page: [],
        },
    };

    const [, formActionStart] = useFormState(startReading, initialState);

    const [, formActionFinish] = useFormState(finishReading, initialState);

    const handlePageInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPageInput(Number(event.target.value));
    };

    useEffect(() => {
        if (!isActiveProgress) {
            setStartPage(pageInput);
        } else {
            setFinishPage(pageInput);
        }
        replace(
            `/reading?id=${selectBook._id}&startPage=${startPage}&finishPage=${finishPage}`,
        );
    }, [
        finishPage,
        isActiveProgress,
        pageInput,
        replace,
        selectBook._id,
        startPage,
    ]);

    return (
        <section className="flex flex-col gap-y-10  md:flex-row md:gap-x-10 xl:flex-col ">
            <div className="md:minw-[295px] w-full ">
                <h3 className="mb-2 self-start pl-[14px]  text-[10px] font-medium leading-3 -tracking-[0.2px] text-fogWhite md:text-sm/[18px] md:-tracking-[0.28px]">
                    Start page:
                </h3>
                <form
                    action={
                        isActiveProgress ? formActionFinish : formActionStart
                    }
                    className="flex w-full flex-col gap-5"
                >
                    <div className="relative flex items-center justify-center">
                        <label className="relative w-full  text-xs font-medium  leading-[16px] -tracking-[0.24px] text-lightGrey md:text-sm md:leading-[18px] md:-tracking-[0.28px]">
                            <input
                                type="text"
                                name="page"
                                value={pageInput}
                                onChange={handlePageInputChange}
                                className="w-full rounded-xl border border-transparent bg-mediumGrey py-[14px] pl-[98px] pr-[14px] font-medium leading-[16px] -tracking-[0.24px] text-fogWhite outline-none transition-all duration-300 placeholder:text-xs placeholder:text-fogWhite hover:border-fogGreyHover md:py-4 md:pl-[111px] md:placeholder:text-sm "
                            />
                            <span className="absolute left-[14px] top-1/2 -translate-y-1/2 transform ">
                                Page number:
                            </span>
                        </label>
                        <input type="hidden" name="id" value={selectBook._id} />
                    </div>

                    <button
                        className={`flex items-center justify-center self-start rounded-[30px] border border-fogGrey px-5 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px] `}
                    >
                        {isActiveProgress ? 'To stop' : 'To start'}
                    </button>
                </form>
            </div>
            <div className="w-full md:min-w-[305px]  ">
                {!isActiveStatistics ? (
                    <ProgressStar />
                ) : (
                    <StatisticsReading selectBook={selectBook} />
                )}
            </div>
        </section>
    );
};
