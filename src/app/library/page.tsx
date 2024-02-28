import { Dashboard } from '@/components/Dashboard/Dashboard';
import { MyLibrary } from '@/components/MyLibrary/MyLibrary';
import { DashboardLibrary } from '@/components/DashboardLibrary/DashboardLibrary';
import Header from '@/components/Header/Header';
import { FC } from 'react';
import { RecommendParams } from '@/utils/definitions';

interface libraryPageProps {
    searchParams: RecommendParams;
}

const libraryPage: FC<libraryPageProps> = ({ searchParams }) => {
    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center gap-4 xl:flex-row">
                <Dashboard>
                    <DashboardLibrary searchParams={searchParams} />
                </Dashboard>
                <MyLibrary searchParams={searchParams} />
            </main>
        </>
    );
};

export default libraryPage;
