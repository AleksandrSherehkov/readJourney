import Image from 'next/image';

import books from '../../../public/assets/image/books.png';
import { TitleDescription } from '../TitleDescription/TitleDescription';

export const FinishedBook = () => {
    return (
        <div className="flex flex-col items-center px-[6px] pb-5 pt-[22px] md:p-[10px] md:pt-3">
            <Image
                src={books}
                alt="books"
                width={68}
                height={70}
                className="mb-5 size-[50px] md:mb-[32px] md:h-[70px] md:w-[68px]"
            />
            <TitleDescription text="The book is read" />

            <p className="mt-[10px] text-center text-sm font-medium leading-[18px] -tracking-[0.28px] text-lightGrey md:mt-[14px]">
                It was an{' '}
                <span className="text-fogWhite">exciting journey</span>, where
                each page revealed new horizons, and the characters became
                inseparable friends.
            </p>
        </div>
    );
};
