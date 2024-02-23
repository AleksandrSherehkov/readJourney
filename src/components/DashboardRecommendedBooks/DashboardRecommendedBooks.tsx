import { RecommendParams } from '@/utils/definitions';
import { RecommendedList } from '../RecommendedList/RecommendedList';
import { FC } from 'react';
import { DashboardNav } from '../DashboardNav/DashboardNav';

interface DashboardRecommendedBooksProps {
    searchParams: RecommendParams;
}

export const DashboardRecommendedBooks: FC<DashboardRecommendedBooksProps> = ({
    searchParams,
}) => {
    return (
        <div className=" h-full rounded-xl bg-mediumGrey ">
            <h2 className="pl-5 pt-5 text-lg font-bold leading-[18px] tracking-[-0.36px] text-[#E3E3E3]">
                Recommended books
            </h2>
            <div className="flex  flex-col gap-y-[11px] px-5 pb-5 md:gap-y-[14px] xl:gap-y-[26px]  ">
                <RecommendedList searchParams={searchParams} />

                <DashboardNav href="recommended" text="Home" />
            </div>
        </div>
    );
};
