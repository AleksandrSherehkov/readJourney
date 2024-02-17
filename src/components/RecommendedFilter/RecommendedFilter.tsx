'use client';

import { RecommendedDescription } from '../RecommendedDescription/RecommendedDescription';
import { RecommendedFilterForm } from '../RecommendedFilterForm/RecommendedFilterForm';
import { RecommendedQuote } from '../RecommendedQuote/RecommendedQuote';

export const RecommendedFilter = () => {
    return (
        <section className="flex flex-col md:flex-row md:gap-x-8 xl:flex-col ">
            <RecommendedFilterForm />
            <RecommendedDescription />
            <RecommendedQuote />
        </section>
    );
};
