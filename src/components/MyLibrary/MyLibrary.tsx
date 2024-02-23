import { getOwnBooks } from '@/services/api';
import { MyLibraryBooksList } from '../MyLibraryBooksList/MyLibraryBooksList';

export const MyLibrary = async () => {
    const booksData = await getOwnBooks();

    return (
        <section className="min-h-[407px] w-full snap-y rounded-[30px] bg-darkGrey px-5 py-10 md:min-h-[518px] md:p-8 xl:min-h-[713px]  xl:w-[847px] xl:px-5 xl:py-10">
            <MyLibraryBooksList data={booksData} />
        </section>
    );
};
