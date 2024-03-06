import { FC } from 'react';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { RecommendedBooks } from '@/components/RecommendedBooks/RecommendedBooks';
import { RecommendedFilter } from '@/components/RecommendedFilter/RecommendedFilter';
import { RecommendParams } from '@/utils/definitions';
import Header from '@/components/Header/Header';

interface RecommendedPageProps {
    searchParams: RecommendParams;
}
const RecommendedPage: FC<RecommendedPageProps> = ({ searchParams }) => {
    return (
        <>
            <Header />
            <main className="flex flex-col items-start gap-[10px] md:gap-4 xl:flex-row">
                <Dashboard>
                    <RecommendedFilter />
                </Dashboard>
                <RecommendedBooks searchParams={searchParams} />
            </main>
        </>
    );
};

export default RecommendedPage;
