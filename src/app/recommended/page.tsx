'use client';
import { FC } from 'react';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { RecommendedBooks } from '@/components/RecommendedBooks/RecommendedBooks';
import { RecommendedFilter } from '@/components/RecommendedFilter/RecommendedFilter';
import { RecommendParams } from '@/utils/definitions';

interface RecommendedPageProps {
    searchParams: RecommendParams;
}
const RecommendedPage: FC<RecommendedPageProps> = ({ searchParams }) => {
    return (
        <main className="m-auto flex w-[335px] flex-col gap-y-[10px] md:w-[704px] xl:w-[1216px] xl:flex-row xl:gap-x-4 xl:gap-y-0">
            <Dashboard>
                <RecommendedFilter />
            </Dashboard>
            <RecommendedBooks searchParams={searchParams} />
        </main>
    );
};

export default RecommendedPage;
