import { RecommendParams } from '@/utils/definitions';
import { AddBookForm } from '../AddBookForm/AddBookForm';
import { DashboardRecommendedBooks } from '../DashboardRecommendedBooks/DashboardRecommendedBooks';
import { FC } from 'react';

interface DashboardLibraryProps {
    searchParams: RecommendParams;
}

export const DashboardLibrary: FC<DashboardLibraryProps> = ({
    searchParams,
}) => {
    return (
        <section className=" flex flex-col items-center justify-center md:flex-row md:gap-8 xl:flex-col xl:gap-[78px]">
            <AddBookForm />
            <DashboardRecommendedBooks searchParams={searchParams} />
        </section>
    );
};
