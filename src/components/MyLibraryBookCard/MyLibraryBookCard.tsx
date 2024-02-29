import { BookResponse } from '@/utils/definitions';
import Image from 'next/image';
import { FC } from 'react';

import deleteBook from '../../../public/assets/image/deleteBook.png';
import bookOpened from '../../../public/assets/image/bookOpened.png';
import { deleteBookById } from '@/services/actions';

interface MyLibraryBookCardProps {
    book: BookResponse;
    handleBookClick: (id: string) => void;
}

export const MyLibraryBookCard: FC<MyLibraryBookCardProps> = ({
    book,
    handleBookClick,
}) => {
    const deleteById = book._id ? deleteBookById.bind(null, book._id) : '';
    console.log(`deleteById:`, deleteById);
    console.log(`deleteById:`, deleteById);

    const handleClick = () => {
        if (book._id) {
            handleBookClick(book._id);
        }
    };

    return (
        <div className="flex cursor-pointer flex-col gap-2  ">
            <Image
                onClick={handleClick}
                src={book.imageUrl || bookOpened}
                alt="image title"
                width={100}
                height={200}
                className="h-[208px] w-[137px] rounded-lg"
            />

            <div className="flex items-center gap-[14px]">
                <div className="w-[92px]">
                    <h2 className=" truncate text-sm font-bold leading-[18px] tracking-[-0.28px] text-fogWhite">
                        {book.title}
                    </h2>
                    <p className=" text-[10px] font-medium leading-3 tracking-[-0.2px] text-lightGrey">
                        {book.author}
                    </p>
                </div>

                <div>
                    <form action={deleteById}>
                        <button>
                            <Image
                                src={deleteBook}
                                alt="delete"
                                width={28}
                                height={28}
                            />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};