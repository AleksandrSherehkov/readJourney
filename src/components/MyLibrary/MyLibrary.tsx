import { getOwnBooks } from '@/services/api';
import { MyLibraryBooksList } from '../MyLibraryBooksList/MyLibraryBooksList';
import { FC } from 'react';
import { OwnBooksParams, RecommendParams } from '@/utils/definitions';

interface MyLibraryProps {
    searchParams: RecommendParams;
}

export const MyLibrary: FC<MyLibraryProps> = async ({ searchParams }) => {
    const { status } = searchParams;

    const data = await getOwnBooks({ status } as OwnBooksParams);
    return (
        <section className="min-h-[407px] w-full snap-y rounded-[30px] bg-darkGrey px-5 py-10 md:min-h-[518px] md:p-8 xl:min-h-[713px]  xl:w-[847px] xl:px-5 xl:py-10">
            <MyLibraryBooksList dataOwn={data} />
        </section>
    );
};
