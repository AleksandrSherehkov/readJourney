import Image from 'next/image';
import { FC } from 'react';

import { BookBase } from '@/utils/definitions';

interface BookCardProps {
    book: BookBase;
    handleBookClick: (id: string) => void;
}

export const BookCard: FC<BookCardProps> = ({ book, handleBookClick }) => {
    return (
        <div
            onClick={() => handleBookClick(book._id)}
            className="cursor-pointer transition-transform duration-300  hover:scale-105"
        >
            <Image
                src={book.imageUrl}
                width={137}
                height={208}
                priority
                alt={book.title}
                className="h-[208px] w-[137px] rounded-lg"
            />
            <p className="truncate text-sm font-bold leading-[18px] -tracking-[0.28px] text-fogWhite">
                {book.title}
            </p>
            <p className="text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-lightGrey">
                {book.author}
            </p>
        </div>
    );
};
