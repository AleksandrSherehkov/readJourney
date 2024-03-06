import React, { FC } from 'react';

import { RecommendParams } from '@/utils/definitions';

import { TitlePage } from '../TitlePage/TitlePage';
import { RecommendedList } from '../RecommendedList/RecommendedList';
import { Pagination } from '../Pagination/Pagination';

interface RecommendedBooksProps {
    searchParams: RecommendParams;
}
export const RecommendedBooks: FC<RecommendedBooksProps> = ({
    searchParams,
}) => {
    return (
        <section className="relative flex min-h-[382px] w-full flex-col rounded-[30px] bg-darkGrey px-5 py-10 md:min-h-[651px] md:p-10 xl:w-[847px] xl:pb-7">
            <div className="mb:mt-5 mb-[22px] flex items-start justify-between">
                <TitlePage text="Recommended" />
                <Pagination searchParams={searchParams} />
            </div>
            <RecommendedList searchParams={searchParams} />
        </section>
    );
};
