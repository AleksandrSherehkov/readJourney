import { AiOutlinePieChart } from 'react-icons/ai';
import { DiaryReading } from '../DiaryReading/DiaryReading';
import { FC, useState } from 'react';
import { BagelStatistics } from '../BagelStatistics/BagelStatistics';
import { RiHourglassLine } from 'react-icons/ri';
import { BookResponse, OwnBooksParams } from '@/utils/definitions';
import { TitleDescription } from '../TitleDescription/TitleDescription';

interface StatisticsReadingProps {
    selectBook: OwnBooksParams | BookResponse;
}

export const StatisticsReading: FC<StatisticsReadingProps> = ({
    selectBook,
}) => {
    const [selectStatistic, setSelectStatistic] = useState<boolean>(false);
    return (
        <>
            <div className="flex items-center justify-between">
                <TitleDescription
                    text={selectStatistic ? 'Statistics' : 'Diary'}
                />

                <div className="flex gap-2">
                    <RiHourglassLine
                        onClick={() => setSelectStatistic(false)}
                        className={`size-4 transition duration-300 ease-in-out hover:scale-125 md:size-5 ${!selectStatistic ? 'text-white' : 'text-current'}`}
                    />
                    <AiOutlinePieChart
                        onClick={() => setSelectStatistic(true)}
                        className={`size-4  transition duration-300 ease-in-out hover:scale-125 md:size-5 ${selectStatistic ? 'text-white' : 'text-current'}`}
                    />
                </div>
            </div>
            {selectStatistic && (
                <p className="hidden font-medium -tracking-[0.28px] text-lightGrey xl:mt-5  xl:block xl:text-sm/[18px]">
                    Each page, each chapter is a new round of knowledge, a new
                    step towards understanding. By rewriting statistics, we
                    create our own reading history.
                </p>
            )}

            {selectStatistic ? (
                <BagelStatistics selectBook={selectBook} />
            ) : (
                <DiaryReading selectBook={selectBook} />
            )}
        </>
    );
};
