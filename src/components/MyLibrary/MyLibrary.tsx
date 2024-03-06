import { FC } from 'react';

import { getOwnBooks } from '@/services/api';
import { OwnBooksParams, RecommendParams } from '@/utils/definitions';

import { MyLibraryBooksList } from '../MyLibraryBooksList/MyLibraryBooksList';

interface MyLibraryProps {
    searchParams: RecommendParams;
}

export const MyLibrary: FC<MyLibraryProps> = async ({ searchParams }) => {
    const { status } = searchParams;

    const data = await getOwnBooks({ status } as OwnBooksParams);

    return (
        <section className="min-h-[407px] w-full rounded-[30px] bg-darkGrey px-5 py-10 md:min-h-[518px] md:p-10 xl:min-h-[651px] xl:w-[847px] xl:pb-7">
            <MyLibraryBooksList dataOwn={data} />
        </section>
    );
};
