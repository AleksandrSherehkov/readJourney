import { FC } from 'react';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

import { InfoBook, RecommendParams } from '@/utils/definitions';
import { finishReadingBook, startReadingBook } from '@/services/api';

import { TitlePage } from '../TitlePage/TitlePage';
import bookOpened from '../../../public/assets/image/bookOpened.png';

interface MyRadingProps {
    selectBook: InfoBook;
    isActiveProgress: boolean;
    searchParams: RecommendParams;
    isActiveStatistics?: boolean;
}

export const MyReading: FC<MyRadingProps> = ({
    selectBook,
    isActiveProgress,
    searchParams,
}) => {
    const { id, startPage, finishPage } = searchParams;
    const { timeLeftToRead } = selectBook;

    const startData = {
        id,
        page: startPage,
    };

    const finishData = {
        id,
        page: finishPage,
    };

    return (
        <section className="w-full items-center justify-between rounded-[30px] bg-darkGrey px-5 py-10 md:p-10">
            <div className="flex items-center justify-between">
                <TitlePage text="My reading" />
                {!!timeLeftToRead?.seconds && (
                    <p className="text-xs font-medium -tracking-[0.24px] text-lightGrey md:text-sm md:leading-[18px] md:-tracking-[0.28px]">
                        {timeLeftToRead?.hours} hours and{' '}
                        {timeLeftToRead?.minutes} minutes left
                    </p>
                )}
            </div>
            {selectBook ? (
                <div className="mx-auto mt-10 flex flex-col items-center md:mt-8 xl:mb-[13px] xl:mt-11">
                    <Image
                        width={224}
                        height={340}
                        alt={selectBook?.title}
                        src={selectBook.imageUrl || bookOpened}
                        className="mb-[10px] h-[208px] w-[137px] rounded-lg md:mb-[25px] md:h-[256px] md:w-[169px] xl:h-[340px] xl:w-[224px]"
                    />
                    <h3 className="mb-[5px] text-center text-sm font-bold leading-[18px] -tracking-[0.28px] text-fogWhite md:mb-1 md:text-xl/none md:-tracking-[0.4px]">
                        {selectBook.title}
                    </h3>
                    <p className="mb-5 text-center text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-lightGrey md:mb-4 md:text-sm/[18px] md:-tracking-[0.28px] xl:mb-[25px]">
                        {selectBook.author}
                    </p>
                    {isActiveProgress ? (
                        <form
                            action={async () => {
                                'use server';
                                await finishReadingBook(finishData);
                                revalidatePath('/reading');
                            }}
                        >
                            <button className="flex size-[40px] items-center justify-center rounded-full border-2 transition-transform duration-300 ease-in-out hover:scale-110 md:size-[50px]">
                                <span className="size-[15px] flex-shrink-0 rounded-[3px] bg-red md:size-5 "></span>
                            </button>
                        </form>
                    ) : (
                        <form
                            action={async () => {
                                'use server';
                                await startReadingBook(startData);
                                revalidatePath('/reading');
                            }}
                        >
                            <button className="flex size-[40px] items-center justify-center rounded-full border-2 transition-transform duration-300 ease-in-out hover:scale-110 md:size-[50px]">
                                <span className="size-[32px] flex-shrink-0 rounded-full bg-red md:size-[42px]"></span>
                            </button>
                        </form>
                    )}
                </div>
            ) : null}
        </section>
    );
};
