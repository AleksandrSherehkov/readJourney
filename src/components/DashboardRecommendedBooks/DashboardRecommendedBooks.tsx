import { FC } from 'react';

import { RecommendParams } from '@/utils/definitions';

import { RecommendedList } from '../RecommendedList/RecommendedList';
import { DashboardNav } from '../DashboardNav/DashboardNav';
import { TitleDescription } from '../TitleDescription/TitleDescription';

interface DashboardRecommendedBooksProps {
    searchParams: RecommendParams;
}

export const DashboardRecommendedBooks: FC<DashboardRecommendedBooksProps> = ({
    searchParams,
}) => {
    return (
        <div className="w-full rounded-xl bg-mediumGrey p-5 md:py-[26px] xl:p-5">
            <TitleDescription text="Recommended books" />
            <div className="mt-[14px] flex w-full flex-col gap-y-[11px] md:mt-5 md:gap-y-[14px]">
                <div className="md:pr-5">
                    <RecommendedList searchParams={searchParams} />
                </div>

                <DashboardNav href="recommended" text="Home" />
            </div>
        </div>
    );
};
