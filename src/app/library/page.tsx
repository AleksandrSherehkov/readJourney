import { FC } from 'react';

import { RecommendParams } from '@/utils/definitions';

import { Dashboard } from '@/components/Dashboard/Dashboard';
import { MyLibrary } from '@/components/MyLibrary/MyLibrary';
import { DashboardLibrary } from '@/components/DashboardLibrary/DashboardLibrary';
import Header from '@/components/Header/Header';

interface libraryPageProps {
    searchParams: RecommendParams;
}

const libraryPage: FC<libraryPageProps> = ({ searchParams }) => {
    return (
        <>
            <Header />
            <main className="flex flex-col items-start gap-[10px] md:gap-4 xl:w-[1216px] xl:flex-row">
                <Dashboard>
                    <DashboardLibrary searchParams={searchParams} />
                </Dashboard>
                <MyLibrary searchParams={searchParams} />
            </main>
        </>
    );
};

export default libraryPage;
