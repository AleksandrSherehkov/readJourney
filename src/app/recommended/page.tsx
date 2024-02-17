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
            <main className="m-auto flex w-full flex-col gap-y-[10px]  xl:w-[1216px] xl:flex-row xl:gap-x-4 xl:gap-y-0">
                <Dashboard>
                    <RecommendedFilter />
                </Dashboard>
                <RecommendedBooks searchParams={searchParams} />
            </main>
        </>
    );
};

export default RecommendedPage;
