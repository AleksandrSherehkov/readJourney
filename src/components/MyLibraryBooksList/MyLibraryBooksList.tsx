'use client';

import { BookResponse } from '@/utils/definitions';
import { FC, useState } from 'react';
import { MyLibraryBookCard } from '../MyLibraryBookCard/MyLibraryBookCard';
import Image from 'next/image';
import books from '../../../public/assets/image/books.png';
import Modal from '../Modal/Modal';
import { SelectedLibraryBook } from '../SelectedLibraryBook/SelectedLibraryBook';

interface MyLibraryBooksListProps {
    data: BookResponse[];
}

export const MyLibraryBooksList: FC<MyLibraryBooksListProps> = ({ data }) => {
    const [selectStatus, setSelectStatus] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    const handleChangeSelect = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectStatus(event.target.value);
    };
    const handleBookClick = (bookId: string) => {
        setSelectedBookId(bookId);

        setIsModalOpen(true);
    };

    const selectedBook = data?.find(book => book._id === selectedBookId);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const filteredData = selectStatus
        ? data.filter(book => book.status === selectStatus)
        : data;

    return (
        <>
            <div className="flex items-center justify-between ">
                <h2 className="text-xl font-bold leading-5 tracking-[-0.4px] text-fogWhite md:text-[28px]">
                    My library
                </h2>
                <select
                    className=" cursor-pointer rounded-[12px] border border-[#3E3E3E] bg-transparent px-[14px] py-[14px] outline-0 "
                    value={selectStatus}
                    onChange={handleChangeSelect}
                >
                    <option className="hover:bg- bg-mediumGrey" value="">
                        All books
                    </option>
                    <option className="bg-mediumGrey " value="unread">
                        Unread
                    </option>
                    <option className="bg-mediumGrey" value="in-progress">
                        In progress
                    </option>
                    <option className="bg-mediumGrey " value="done">
                        Done
                    </option>
                </select>
            </div>
            {filteredData.length > 0 ? (
                <ul className="custom-scrollbar mt-[22px] flex h-[407px] flex-wrap   gap-5  gap-x-5 md:mt-7 md:max-h-[518px] md:gap-x-[25px] md:gap-y-[27px] xl:max-h-[575px]">
                    {filteredData?.map(book => (
                        <li key={book._id} className=" rounded-lg">
                            <MyLibraryBookCard
                                book={book}
                                handleBookClick={handleBookClick}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center gap-5 pt-[63px] md:pt-[86px] xl:pt-[147px]">
                    <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-mediumGrey md:h-[130px] md:w-[130px]">
                        <Image
                            src={books}
                            alt="books"
                            width={50}
                            height={50}
                            className="h-[50px] md:w-[70px]"
                        />
                    </div>
                    <p className=" w-[197px] pb-[100px] text-center text-sm font-medium leading-[18px] tracking-[-0.28px] text-lightGrey md:w-[274px] md:pb-[160px]">
                        <span className="text-fogWhite ">
                            To start training, add{' '}
                        </span>
                        some of your books
                        <span className="text-fogWhite ">
                            {' '}
                            or from the recommended ones
                        </span>
                    </p>
                </div>
            )}
            {selectedBook && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <SelectedLibraryBook
                        selectedBook={selectedBook}
                        handleCloseModal={handleCloseModal}
                    />
                </Modal>
            )}
        </>
    );
};
