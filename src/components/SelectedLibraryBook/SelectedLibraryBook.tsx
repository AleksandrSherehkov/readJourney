import Image from 'next/image';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { BookResponse } from '@/utils/definitions';

import { Button } from '../Button/Button';
import bookOpened from '../../../public/assets/image/bookOpened.png';

interface SelectedLibraryBookProps {
    selectedBook: BookResponse;
    handleCloseModal: () => void;
}

export const SelectedLibraryBook: FC<SelectedLibraryBookProps> = ({
    selectedBook,
    handleCloseModal,
}) => {
    const { replace } = useRouter();

    const handleReadingBook = (bookId: string) => {
        replace(`/reading?id=${bookId}`);
        handleCloseModal();
    };

    return (
        <div className="W-[335px] flex flex-col items-center">
            <Image
                src={selectedBook.imageUrl || bookOpened}
                width={141}
                height={213}
                priority
                alt={selectedBook.title}
                className="h-[213px] w-[141px] rounded-lg "
            />
            <div className="w-[255px]">
                <p className="mt-4 truncate text-center text-lg font-bold leading-[18px] -tracking-[0.36px] text-fogWhite">
                    {selectedBook.title}
                </p>
                <p className="mt-0.5 text-center text-xs font-medium leading-[14px] -tracking-[0.24px] text-lightGrey">
                    {selectedBook.author}
                </p>
                <p className="mb-5 mt-1 text-center text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-fogWhite">
                    {selectedBook.totalPages} pages{' '}
                </p>
            </div>
            <Button
                position="center"
                text="Start reading"
                onClick={() => handleReadingBook(selectedBook._id)}
            />
        </div>
    );
};
