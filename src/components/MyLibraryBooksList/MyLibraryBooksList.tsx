'use client';

import Select, { MultiValue, SingleValue } from 'react-select';
import { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BookResponse } from '@/utils/definitions';
import { selectedStyles } from '@/utils/selectedStyles';

import { MyLibraryBookCard } from '../MyLibraryBookCard/MyLibraryBookCard';
import books from '../../../public/assets/image/books.png';
import Modal from '../Modal/Modal';
import { SelectedLibraryBook } from '../SelectedLibraryBook/SelectedLibraryBook';

interface MyLibraryBooksListProps {
    dataOwn: BookResponse[];
}

export const MyLibraryBooksList: FC<MyLibraryBooksListProps> = ({
    dataOwn,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

    const { push } = useRouter();

    const options = [
        { value: '', label: 'All books' },
        { value: 'unread', label: 'Unread' },
        { value: 'in-progress', label: 'In progress' },
        { value: 'done', label: 'Done' },
    ];

    interface ISelectOption {
        value: string;
        label: string;
    }

    const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(
        null,
    );

    const handleChangeSelect = (
        selectedOption: SingleValue<ISelectOption> | MultiValue<ISelectOption>,
    ) => {
        const singleValueOption = selectedOption as SingleValue<ISelectOption>;
        if (singleValueOption) {
            setSelectedOption(singleValueOption);
            const value = singleValueOption.value;

            if (value === '') {
                push(`/library`);
            } else {
                push(`/library?status=${value}`);
            }
        }
    };

    const handleBookClick = (bookId: string) => {
        setSelectedBookId(bookId);
        setIsModalOpen(true);
    };

    const selectedBook = dataOwn?.find(book => book._id === selectedBookId);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const selectStyles = selectedStyles();

    return (
        <>
            <div className="flex items-start justify-between ">
                <h2 className="text-xl font-bold leading-5 tracking-[-0.4px] text-fogWhite md:text-[28px]">
                    My library
                </h2>
                <Select
                    styles={selectStyles}
                    options={options}
                    onChange={handleChangeSelect}
                    value={selectedOption}
                    placeholder="All books"
                />
            </div>
            {dataOwn.length > 0 ? (
                <div className="custom-scrollbar h-full max-h-[327px] pl-1 pt-2 md:-mr-[17px] md:max-h-[438px] xl:max-h-[520px]">
                    <ul className="flex flex-col gap-5 md:flex-row md:flex-wrap md:gap-[25px] md:gap-y-[27px] xl:gap-x-5">
                        {dataOwn?.map(book => (
                            <li key={book._id} className="w-[137px] rounded-lg">
                                <MyLibraryBookCard
                                    book={book}
                                    handleBookClick={handleBookClick}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-[10px] pb-[60px] pt-[63px] md:pb-[120px] md:pt-[86px] xl:pb-[204px] xl:pt-[147px]">
                    <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-mediumGrey md:h-[130px] md:w-[130px]">
                        <Image
                            src={books}
                            alt="books"
                            width={50}
                            height={50}
                            className="h-[50px] md:w-[70px]"
                        />
                    </div>
                    <p className="w-[197px] text-center text-sm font-medium leading-[18px] tracking-[-0.28px] text-lightGrey md:w-[274px]">
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
