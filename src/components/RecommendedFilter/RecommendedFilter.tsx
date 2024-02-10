'use client';
import { getRecommendedBooks } from '@/services/api';
import { RecommendParams } from '@/utils/definitions';

import { RecommendedDescription } from '../RecommendedDescription/RecommendedDescription';
import { RecommendedFilterForm } from '../RecommendedFilterForm/RecommendedFilterForm';
import { RecommendedQuote } from '../RecommendedQuote/RecommendedQuote';

export const RecommendedFilter = () => {
    const handleFormSubmit = async (formData: RecommendParams) => {
        try {
            const data = await getRecommendedBooks(formData);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex flex-col md:flex-row md:gap-x-8 xl:flex-col">
            <RecommendedFilterForm onFormSubmit={handleFormSubmit} />
            <RecommendedDescription />
            <RecommendedQuote />
        </section>
    );
};
