'use client';
import React, { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '../Button/Button';
import { InputFilter } from '../InputFilter/InputFilter';

export const RecommendedFilterForm = () => {
    const formRef = useRef(null);
    const { replace } = useRouter();

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
            className="flex w-full flex-col items-center"
            onSubmit={handleSubmit}
        >
            <h3 className="mb-2 ml-[14px] self-start text-[10px] font-medium leading-[12px] -tracking-[0.2px] text-fogWhite  md:text-sm md:leading-[18px] md:-tracking-[0.28px]">
                Filters:
            </h3>
            <div className="mb-5 flex w-full flex-col items-center justify-center gap-y-2">
                <InputFilter
                    name="bookTitle"
                    textLabel="Book title:"
                    placeholder="Enter text"
                    mobilePaddingLeft="pl-[77px]"
                    paddingLeft="md:pl-[86px]"
                />
                <InputFilter
                    name="author"
                    textLabel="The author:"
                    placeholder="Enter text"
                    mobilePaddingLeft="pl-[85px]"
                    paddingLeft="md:pl-[95px]"
                />
            </div>
            <Button type="submit" text="To apply" />
        </form>
    );
};
