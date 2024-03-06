'use client';
import { FC, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';

import { getRecommendedBooks } from '@/services/api';
import {
    BookResponse,
    RecommendParams,
    ResponseList,
} from '@/utils/definitions';

import { BookCard } from '../BookCard/BookCard';
import Modal from '../Modal/Modal';
import { SelectedBook } from '../SelectedBook/SelectedBook';

interface RecommendedListProps {
    searchParams: RecommendParams;
}

export const RecommendedList: FC<RecommendedListProps> = ({ searchParams }) => {
    const RECOMMENDED_PATH = '/recommended';

    const [recommendedBooks, setRecommendedBooks] =
        useState<ResponseList<BookResponse> | null>(null);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
    const isDesktop = useMediaQuery({ minWidth: 1280 });

    const router = useRouter();
    const pathname = usePathname();

    const selectedBook = recommendedBooks?.results.find(
        book => book._id === selectedBookId,
    );

    useEffect(() => {
        let limit: number | string;
        if (pathname === RECOMMENDED_PATH) {
            if (isMobile) {
                limit = 2;
            } else if (isTablet) {
                limit = 8;
            } else {
                limit = 10;
            }
        } else {
            limit = 3;
        }

        const fetchBooks = async () => {
            const books = await getRecommendedBooks({ ...searchParams, limit });
            setRecommendedBooks(books);

            const finalSearchParams = {
                ...searchParams,
                page: searchParams.page?.toString() || '1',
                limit: limit.toString(),
                total: books.totalPages?.toString(),
            };
            const query = new URLSearchParams(finalSearchParams).toString();
            pathname === RECOMMENDED_PATH
                ? router.replace(`${RECOMMENDED_PATH}?${query}`)
                : router.replace(`/library?${query}`);
        };

        fetchBooks();
    }, [
        isMobile,
        isTablet,
        isDesktop,
        searchParams.limit,
        searchParams.page,
        router,
        pathname,
    ]);

    const handleBookClick = (bookId: string) => {
        setSelectedBookId(bookId);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {recommendedBooks?.results.length ? (
                <ul
                    className={clsx(
                        'flex flex-wrap justify-center gap-5  md:gap-y-[27px] xl:gap-x-5',
                        {
                            'md:gap-x-[25px]': pathname === '/recommended',
                            'md:gap-x-[20px]': pathname === '/library',
                        },
                    )}
                >
                    {recommendedBooks.results.map(book => (
                        <li key={book._id} className="rounded-lg">
                            <BookCard
                                book={book}
                                handleBookClick={handleBookClick}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                pathname === RECOMMENDED_PATH && (
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-base font-bold text-fogWhite md:text-2xl">
                        No book found for your request...
                    </p>
                )
            )}
            {selectedBookId && selectedBook && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <SelectedBook
                        selectedBook={selectedBook}
                        handleCloseModal={handleCloseModal}
                    />
                </Modal>
            )}
        </>
    );
};
