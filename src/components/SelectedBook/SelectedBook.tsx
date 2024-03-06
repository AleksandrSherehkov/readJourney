import Image from 'next/image';
import { FC } from 'react';
import { toast } from 'react-toastify';

import { addBookToLibrary } from '@/services/actions';

interface SelectedBookProps {
    selectedBook: {
        _id: string;
        title: string;
        author: string;
        imageUrl: string;
        totalPages: number;
    };
    handleCloseModal: () => void;
}
export const SelectedBook: FC<SelectedBookProps> = ({
    selectedBook,
    handleCloseModal,
}) => {
    const { _id, title } = selectedBook;

    const addBookWithId = async () => {
        const result = await addBookToLibrary({ _id, title });
        if (!result.success) {
            toast.info(result.error);
            handleCloseModal();
        } else {
            toast.success('Book added to library');

            handleCloseModal();
        }
    };

    return (
        <div className="W-[335px] flex flex-col items-center">
            <Image
                src={selectedBook.imageUrl}
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
            <button
                className="flex items-center justify-center self-center rounded-[30px] border border-fogGrey px-5 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px] "
                onClick={addBookWithId}
            >
                Add to library
            </button>
        </div>
    );
};
