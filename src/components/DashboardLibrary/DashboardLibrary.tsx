import { FC } from 'react';

import { RecommendParams } from '@/utils/definitions';

import { AddBookForm } from '../AddBookForm/AddBookForm';
import { DashboardRecommendedBooks } from '../DashboardRecommendedBooks/DashboardRecommendedBooks';

interface DashboardLibraryProps {
    searchParams: RecommendParams;
}

export const DashboardLibrary: FC<DashboardLibraryProps> = ({
    searchParams,
}) => {
    return (
        <section className="flex w-full flex-col gap-5 md:flex-row md:gap-8 xl:flex-col xl:gap-[78px]">
            <AddBookForm />
            <DashboardRecommendedBooks searchParams={searchParams} />
        </section>
    );
};
