'use client';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

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
    const [recommendedBooks, setRecommendedBooks] =
        useState<ResponseList<BookResponse> | null>(null);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const selectedBook = recommendedBooks?.results.find(
        book => book._id === selectedBookId,
    );

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
    const isDesktop = useMediaQuery({ minWidth: 1280 });

    useEffect(() => {
        let limit: number | string;
        if (isMobile) {
            limit = 2;
        } else if (isTablet) {
            limit = 8;
        } else {
            limit = 10;
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
            router.replace(`/recommended?${query}`);
        };

        fetchBooks();
    }, [isMobile, isTablet, isDesktop, searchParams, router]);

    const handleBookClick = (bookId: string) => {
        setSelectedBookId(bookId);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // Закрываем модалку
    };

    return (
        <>
            <ul className="mt-[22px] flex flex-wrap   gap-x-5 md:mt-7 md:gap-x-[25px] md:gap-y-[27px] ">
                {recommendedBooks?.results.map(book => (
                    <li key={book._id} className="w-[137px] rounded-lg">
                        <BookCard
                            book={book}
                            handleBookClick={handleBookClick}
                        />
                    </li>
                ))}
            </ul>
            {selectedBookId && selectedBook && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <SelectedBook selectedBook={selectedBook} />
                </Modal>
            )}
        </>
    );
};
