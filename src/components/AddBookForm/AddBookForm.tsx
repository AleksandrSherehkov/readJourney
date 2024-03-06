'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { createBook } from '@/services/actions';

import { Button } from '../Button/Button';
import { InputFilter } from '../InputFilter/InputFilter';
import { ModalAddBook } from '../ModalAddBook/ModalAddBook';

export const AddBookForm = () => {
    const initialState = {
        message: '',
        errors: {
            title: [],
            author: [],
            totalPages: [],
        },
    };

    const formRef = useRef<HTMLFormElement>(null);

    const [formState, formAction] = useFormState(createBook, initialState);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (formState?.message === 'success') {
            formRef.current?.reset();
            setIsModalOpen(true);
        }
    }, [formState]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ModalAddBook isOpen={isModalOpen} onClose={handleCloseModal} />

            <div className="w-full">
                <h2 className="pb-2 pl-3 text-[10px] font-medium leading-3 tracking-wide text-fogWhite md:text-sm">
                    Create your library:
                </h2>
                <form
                    className="flex flex-col gap-1"
                    action={formAction}
                    ref={formRef}
                >
                    <InputFilter
                        name="bookTitle"
                        textLabel="Book title:"
                        placeholder="Enter text"
                        mobilePaddingLeft="pl-[77px]"
                        paddingLeft="md:pl-[86px]"
                    />
                    <span className="pl-4 text-xs text-rose-500">
                        {formState.errors?.title}
                    </span>
                    <InputFilter
                        name="author"
                        textLabel="The author:"
                        placeholder="Enter text"
                        mobilePaddingLeft="pl-[85px]"
                        paddingLeft="md:pl-[95px]"
                    />
                    <span className="pl-4 text-xs text-rose-500">
                        {formState?.errors?.author}
                    </span>
                    <InputFilter
                        name="numberPages"
                        textLabel="Number of pages:"
                        placeholder="0"
                        mobilePaddingLeft="pl-[120px]"
                        paddingLeft="md:pl-[135px]"
                    />
                    <span className="pl-4 text-xs text-rose-500">
                        {formState?.errors?.totalPages}
                    </span>

                    <div className="mt-[12px]">
                        <Button text="Add book" />
                    </div>
                </form>
            </div>
        </>
    );
};
