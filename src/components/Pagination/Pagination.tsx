'use client';

import { FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { RecommendParams } from '@/utils/definitions';
interface PaginationProps {
    searchParams: RecommendParams;
}

export const Pagination: FC<PaginationProps> = ({ searchParams }) => {
    const { page, total } = searchParams;
    const currentPage = parseInt(page?.toString() ?? '1');
    const totalPages = parseInt(total?.toString() ?? '0');

    const pathname = usePathname();
    const router = useRouter();

    const buttonBaseClasses =
        'group flex size-8 flex-shrink-0 items-center justify-center rounded-full border border-fogGrey bg-darkGrey md:size-10';

    const activeButtonClasses =
        'transition-all duration-300 ease-in-out hover:scale-105 hover:border-fogWhite hover:bg-fogWhite hover:shadow-md';

    const disabledButtonClasses = 'cursor-not-allowed opacity-50';

    const getButtonClasses = (isDisabled: boolean) =>
        `${buttonBaseClasses} ${isDisabled ? disabledButtonClasses : activeButtonClasses}`;

    const handlePageChange = (newPage: number) => {
        const newSearchParams = new URLSearchParams();

        if (searchParams.title)
            newSearchParams.set('title', searchParams.title);
        if (searchParams.author)
            newSearchParams.set('author', searchParams.author);
        if (searchParams.limit)
            newSearchParams.set('limit', searchParams.limit.toString());
        if (searchParams.total)
            newSearchParams.set('total', searchParams.total.toString());
        newSearchParams.set('page', newPage.toString());

        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex gap-x-2">
            <button
                type="button"
                disabled={currentPage <= 1}
                onClick={handlePrevPage}
                className={getButtonClasses(currentPage <= 1)}
            >
                <MdKeyboardArrowLeft
                    size={16}
                    className={`fill-fogWhite md:size-5 ${currentPage <= 1 ? disabledButtonClasses : 'group-hover:fill-darkGrey'}`}
                />
            </button>
            {/* ... */}
            <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={handleNextPage}
                className={getButtonClasses(currentPage >= totalPages)}
            >
                <MdKeyboardArrowRight
                    size={16}
                    className={`fill-fogWhite md:size-5 ${currentPage >= totalPages ? disabledButtonClasses : 'group-hover:fill-darkGrey'}`}
                />
            </button>
        </div>
    );
};
