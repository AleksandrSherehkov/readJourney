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
        <section className="w-full  rounded-[30px] bg-darkGrey px-5 py-10 md:p-8 xl:w-[847px]  xl:px-5 xl:py-10 ">
            <TitlePage text="Recommended" />
            <Pagination searchParams={searchParams} />
            <RecommendedList searchParams={searchParams} />
        </section>
    );
};
