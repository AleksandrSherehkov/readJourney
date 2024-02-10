import Image from 'next/image';
import books from '../../../public/assets/image/books.png';

export const MyLibrary = () => {
    return (
        <section className="min-h-[407px] w-full rounded-[30px] bg-darkGrey xl:h-[682px] ">
            <div className="flex items-center justify-between px-5 pt-10 ">
                <h2 className="text-xl font-bold leading-5 tracking-[-0.4px] text-fogWhite md:text-[28px]">
                    My library
                </h2>
                <select className=" rounded-[12px] border border-[#3E3E3E] bg-transparent px-[14px] py-3">
                    <option value="">All books</option>
                    <option value="">Unread</option>
                    <option value="">In progress</option>
                    <option value="">Done</option>
                </select>
            </div>
            <div className="flex flex-col items-center justify-center gap-[10px] pt-[63px] md:pt-[86px] xl:pt-[147px]">
                <div className="flex h-[100px] w-[100px] items-center justify-center  rounded-full bg-mediumGrey md:h-[130px] md:w-[130px]">
                    <Image
                        src={books}
                        alt="books"
                        width={50}
                        height={50}
                        className="h-[70px] md:w-[70px]"
                    />
                </div>
                <p className="px-[69px] text-center text-sm font-medium leading-[18px] tracking-[-0.28px] text-lightGrey md:px-[215px] md:pb-[160px]">
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
        </section>
    );
};
