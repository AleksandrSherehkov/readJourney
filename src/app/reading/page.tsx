'use server';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { DashboardReading } from '@/components/DashboardReading/DashboardReading';
import Header from '@/components/Header/Header';
import { MyReading } from '@/components/MyReading/MyReading';
import { getBookDetails } from '@/services/api';
import { RecommendParams } from '@/utils/definitions';
import React, { FC } from 'react';

interface ReadingPageProps {
    searchParams: RecommendParams;
}

const ReadingPage: FC<ReadingPageProps> = async ({ searchParams }) => {
    const { id: bookId } = searchParams;
    const selectBook = await getBookDetails(bookId!);

    const isActiveStatistics = selectBook?.progress?.some(p => p.finishPage);

    const isActiveProgress =
        selectBook?.progress?.some(p => p.status === 'active') || false;

    return (
        <>
            <Header />
            <main className="m-auto flex w-full flex-col gap-y-[10px] md:gap-y-4 xl:flex-row xl:gap-x-4 xl:gap-y-0">
                <Dashboard>
                    {selectBook && (
                        <DashboardReading
                            selectBook={selectBook}
                            isActiveProgress={isActiveProgress}
                            isActiveStatistics={isActiveStatistics}
                        />
                    )}
                </Dashboard>
                {selectBook ? (
                    <MyReading
                        selectBook={selectBook}
                        isActiveProgress={isActiveProgress}
                        searchParams={searchParams}
                        isActiveStatistics={isActiveStatistics}
                    />
                ) : null}
            </main>
        </>
    );
};

export default ReadingPage;
