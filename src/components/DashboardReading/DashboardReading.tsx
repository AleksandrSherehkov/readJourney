'use client';

import React, { FC, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { finishReading, startReading } from '@/services/actions';
import { InfoBook } from '@/utils/definitions';

import { ProgressStar } from '../ProgressStar/ProgressStar';
import { StatisticsReading } from '../StatisticsReading/StatisticsReading';
import Modal from '../Modal/Modal';
import { FinishedBook } from './../FinishedBook/FinishedBook';

interface DashboardReadingProps {
    selectBook: InfoBook;
    isActiveProgress: boolean;
    isActiveStatistics?: boolean;
}

export const DashboardReading: FC<DashboardReadingProps> = ({
    selectBook,
    isActiveProgress,
    isActiveStatistics,
}) => {
    const { replace } = useRouter();

    const lastSessionIndex = selectBook.progress?.length
        ? selectBook.progress.length - 1
        : 0;
    const lastProgress = selectBook.progress?.[lastSessionIndex] ?? {
        startPage: 1,
        finishPage: 1,
    };

    const initialPage =
        lastProgress.startPage >= lastProgress.finishPage ||
        !lastProgress.finishPage
            ? lastProgress.startPage
            : lastProgress.finishPage;

    const [pageInput, setPageInput] = useState(initialPage?.toString());
    const [startPage, setStartPage] = useState<number>(initialPage);
    const [finishPage, setFinishPage] = useState<number>(initialPage);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialState = {
        message: '',
        data: {
            page: initialPage,
            id: selectBook._id,
        },
        error: '',
    };

    const [, formActionStart] = useFormState(startReading, initialState);

    const [stateActionFinish, formActionFinish] = useFormState(
        finishReading,
        initialState,
    );

    const handlePageInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;
        const isNumeric = /^(?!0)\d*$/;

        if (selectBook.status === 'done') {
            setErrorMessage('The book is read, choose another.');
            return;
        }

        if (value === '' || isNumeric.test(value)) {
            const inputPage = value === '' ? 0 : Number(value);

            if (inputPage > selectBook.totalPages) {
                setErrorMessage(
                    `Please enter no more than pages in the book ${selectBook.totalPages}`,
                );
            } else {
                setPageInput(value);
                setErrorMessage('');
            }
        } else {
            setErrorMessage('Please enter only positive numbers.');
        }
    };

    useEffect(() => {
        if (stateActionFinish?.error) {
            setErrorMessage(stateActionFinish?.error);
        }
        if (selectBook.status === 'done') {
            setIsModalOpen(true);
        }
    }, [selectBook.status, stateActionFinish?.error]);

    useEffect(() => {
        const pageValue = Number(pageInput) || 0;

        if (!isActiveProgress) {
            setStartPage(pageValue);
        } else {
            setFinishPage(pageValue);
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className="flex flex-col gap-10 md:flex-row md:gap-10 xl:mr-0 xl:flex-col ">
            <div className="w-full">
                <h3 className="mb-2 self-start pl-[14px] text-[10px] font-medium leading-3 -tracking-[0.2px] text-fogWhite md:text-sm/[18px] md:-tracking-[0.28px]">
                    {isActiveProgress ? 'Stop page:' : 'Start page:'}
                </h3>
                <form
                    action={
                        isActiveProgress ? formActionFinish : formActionStart
                    }
                    className="flex w-full flex-col gap-5"
                >
                    <div className="relative flex flex-col  justify-center">
                        <label className="relative w-full  text-xs font-medium  leading-[16px] -tracking-[0.24px] text-lightGrey md:text-sm md:leading-[18px] md:-tracking-[0.28px]">
                            <input
                                type="text"
                                name="page"
                                value={pageInput}
                                onChange={handlePageInputChange}
                                className="input-number w-full rounded-xl border border-transparent bg-mediumGrey py-[14px] pl-[98px] pr-[14px] font-medium leading-[16px] -tracking-[0.24px] text-fogWhite outline-none transition-all duration-300 placeholder:text-xs placeholder:text-fogWhite hover:border-fogGreyHover md:py-4 md:pl-[111px] md:placeholder:text-sm "
                            />
                            <span className="absolute left-[14px] top-1/2 -translate-y-1/2 transform ">
                                Page number:
                            </span>
                        </label>
                        {errorMessage && (
                            <p className="ml-4  text-[10px]  text-red md:text-xs">
                                {errorMessage}
                            </p>
                        )}
                        <input type="hidden" name="id" value={selectBook._id} />
                    </div>

                    <button
                        disabled={selectBook.status === 'done'}
                        className={clsx(
                            'flex items-center justify-center self-start rounded-[30px] border border-fogGrey px-5 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite  md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px] ',
                            {
                                'cursor-not-allowed bg-darkGrey opacity-100':
                                    selectBook.status === 'done',
                                'transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey':
                                    selectBook.status !== 'done',
                            },
                        )}
                    >
                        {isActiveProgress ? 'To stop' : 'To start'}
                    </button>
                </form>
            </div>
            <div className=" w-full md:mb-0 xl:min-w-[313px]">
                {!isActiveStatistics ? (
                    <ProgressStar />
                ) : (
                    <StatisticsReading selectBook={selectBook} />
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <FinishedBook />
            </Modal>
        </section>
    );
};
