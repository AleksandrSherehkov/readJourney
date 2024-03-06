import { RecommendedDescriptionItem } from '../RecommendedDescriptionItem/RecommendedDescriptionItem';
import { DashboardNav } from '../DashboardNav/DashboardNav';
import { TitleDescription } from '../TitleDescription/TitleDescription';
export const RecommendedDescription = () => {
    return (
        <div className="mt-5 flex w-full flex-col rounded-xl bg-mediumGrey p-5 md:mt-0 xl:mt-5">
            <TitleDescription text="Start your workout" />
            <ul className="mb-[14px] mt-5 flex flex-col gap-y-5 pr-5 md:mb-5 md:mt-10">
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
