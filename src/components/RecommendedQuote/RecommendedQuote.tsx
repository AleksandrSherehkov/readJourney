import Image from 'next/image';
import books from '../../../public/assets/image/books.png';

export const RecommendedQuote = () => {
    return (
        <div className="mt-5 hidden w-full items-center gap-x-[14px] rounded-xl  bg-mediumGrey  px-5 py-[15px] xl:flex   ">
            <Image
                src={books}
                width={40}
                height={40}
                alt="Books"
                className="size-10"
            />
            <blockquote>
                <p className="text-sm font-medium leading-[18px] -tracking-[0.28px] text-lightGrey">
                    Books are <span className="text-fogWhite">windows</span> to
                    the world, and reading is a journey into the unknown.
                </p>
            </blockquote>
        </div>
    );
};
