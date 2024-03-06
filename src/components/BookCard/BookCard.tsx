'use client';

import Image from 'next/image';
import { FC } from 'react';

import { BookBase } from '@/utils/definitions';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface BookCardProps {
    book: BookBase;
    handleBookClick: (id: string) => void;
}

export const BookCard: FC<BookCardProps> = ({ book, handleBookClick }) => {
    const pathname = usePathname();

    return (
        <div
            onClick={() => handleBookClick(book._id)}
            className="cursor-pointer transition-transform duration-300  hover:scale-105"
        >
            <Image
                src={book.imageUrl}
                width={71}
                height={137}
                priority
                alt={book.title}
                className={clsx('mb-2 rounded-lg', {
                    'h-[208px] w-[137px]': pathname === '/recommended',
                    'h-[107px] w-[71px]': pathname === '/library',
                })}
            />
            <h3
                className={clsx('mb-[2px] truncate font-bold text-fogWhite', {
                    'w-[137px] text-sm leading-[18px] -tracking-[0.28px]':
                        pathname === '/recommended',
                    'w-[71px] text-[10px] leading-[12px] -tracking-[0.2px]':
                        pathname === '/library',
                })}
            >
                {book.title}
            </h3>
            <p className="text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-lightGrey">
                {book.author}
            </p>
        </div>
    );
};
