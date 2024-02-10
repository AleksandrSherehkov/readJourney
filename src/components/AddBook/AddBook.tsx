import { Button } from '../Button/Button';

export const AddBook = () => {
    return (
        <div>
            <h2 className="pb-2 pl-3  text-[10px] font-medium leading-3 tracking-wide text-fogWhite md:text-sm">
                Create your library:
            </h2>
            <form className="flex  flex-col gap-2">
                <div className="relative flex items-center justify-center ">
                    <input
                        type="text"
                        className="h-auto min-w-[295px] rounded-xl bg-mediumGrey py-[14px] pl-[86px] text-fogWhite"
                    />
                    <span className="absolute left-[14px] font-medium leading-[18px] text-lightGrey">
                        Book title:
                    </span>
                </div>
                <div className="relative flex items-center justify-center ">
                    <input
                        type="text"
                        className="h-auto min-w-[295px] rounded-xl bg-mediumGrey py-[14px] pl-[95px] text-fogWhite"
                    />
                    <span className="absolute left-[14px] font-medium leading-[18px] text-lightGrey">
                        The author:
                    </span>
                </div>
                <div className="relative flex items-center justify-center ">
                    <input
                        type="text"
                        className="h-auto min-w-[295px] rounded-xl bg-mediumGrey py-[14px] pl-[135px] text-fogWhite"
                    />
                    <span className="absolute left-[14px] font-medium leading-[18px] text-lightGrey">
                        Number of pages:
                    </span>
                </div>
                <div className="py-5">
                    <Button text="Add book" />

                    {/* <button className="rounded-[30px] border border-fogGrey px-5 py-3 text-sm font-bold leading-[18px] text-fogWhite">
                        Add book
                    </button> */}
                </div>
            </form>
        </div>
    );
};
