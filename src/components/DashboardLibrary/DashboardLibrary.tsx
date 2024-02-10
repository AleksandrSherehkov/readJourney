import { AddBook } from '../AddBook/AddBook';
import { DashboardRecommendedBooks } from '../DashboardRecommendedBooks/DashboardRecommendedBooks';

export const DashboardLibrary = () => {
    return (
        <div className=" flex flex-col items-center justify-center md:flex-row md:gap-8 xl:flex-col xl:gap-[78px]">
            <AddBook />
            <DashboardRecommendedBooks />
        </div>
    );
};
