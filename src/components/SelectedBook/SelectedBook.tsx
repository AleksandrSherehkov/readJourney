import Image from 'next/image';
import { FC, useCallback } from 'react';

import { addBookById } from '@/services/api';

import { Button } from '../Button/Button';
import { toast } from 'react-toastify';

interface ISelectedBookProps {
    selectedBook: {
        _id: string;
        title: string;
        author: string;
        imageUrl: string;
        totalPages: number;
    };
}
export const SelectedBook: FC<ISelectedBookProps> = ({ selectedBook }) => {
    const handleAddBook = useCallback(async () => {
        try {
            await addBookById(selectedBook._id);
            toast.success('Book added to library successfully');
        } catch (error) {
            console.error('Failed to add book to library', error);
            toast.error('Failed to add book to library');
        }
    }, [selectedBook._id]);

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
            <Button
                position="center"
                text="Add to library"
                onClick={handleAddBook}
            />
        </div>
    );
};
