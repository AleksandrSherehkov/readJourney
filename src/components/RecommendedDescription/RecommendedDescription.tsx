import { RecommendedDescriptionItem } from '../RecommendedDescriptionItem/RecommendedDescriptionItem';
import { DashboardNav } from '../DashboardNav/DashboardNav';
export const RecommendedDescription = () => {
    return (
        <div className="mt-8 flex  w-full flex-col gap-y-5 rounded-xl bg-mediumGrey p-5 md:mt-0 md:gap-y-0 xl:mt-5">
            <h2 className="text-lg font-bold leading-[18px] -tracking-[0.36px] text-fogWhite md:text-xl md:leading-[20px] md:-tracking-[0.4px]">
                Start your workout
            </h2>
            <ul className="flex flex-col gap-y-5 md:mt-10">
                <RecommendedDescriptionItem
                    number="1"
                    spanText="Create a personal library:"
                    text="add the books you intend to read to it."
                />
                <RecommendedDescriptionItem
                    number="2"
                    spanText="Create your first workout:"
                    text="define a goal, choose a period, start training."
                />
            </ul>
            <DashboardNav href="library" text="My library" />
        </div>
    );
};
