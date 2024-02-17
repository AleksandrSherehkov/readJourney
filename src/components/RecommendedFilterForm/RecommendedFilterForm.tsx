'use client';
import React, { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { Button } from '../Button/Button';
import { InputFilter } from '../InputFilter/InputFilter';

export const RecommendedFilterForm = () => {
    const formRef = useRef(null);
    const { replace } = useRouter();

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const paddingLeftBookTitle = isMobile ? 'pl-[77px]' : 'pl-[86px]';
    const paddingLeftAuthor = isMobile ? 'pl-[85px]' : 'pl-[95px]';

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const title = formData.get('bookTitle') as string;
            const author = formData.get('author') as string;
            const query = new URLSearchParams();

            if (title) query.set('title', title);
            if (author) query.set('author', author);
            replace(`/recommended?${query.toString()}`);
        }
    };

    return (
        <form
            ref={formRef}
            className="flex w-full flex-col items-center "
            onSubmit={handleSubmit}
        >
            <h3 className="mb-2 self-start pl-[14px] text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-fogWhite  md:text-sm md:leading-[18px] md:-tracking-[0.28px]">
                Filters:
            </h3>
            <div className="mb-5 flex w-full flex-col items-center justify-center gap-y-2">
                <InputFilter
                    name="bookTitle"
                    textLabel="Book title:"
                    placeholder="Enter text"
                    paddingLeft={paddingLeftBookTitle}
                />
                <InputFilter
                    name="author"
                    textLabel="The author:"
                    placeholder="Enter text"
                    paddingLeft={paddingLeftAuthor}
                />
            </div>
            <Button type="submit" text="To apply" />
        </form>
    );
};
