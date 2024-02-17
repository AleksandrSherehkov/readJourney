import { signOut } from '../../../auth';

export const LogOut = () => {
    return (
        <form
            className="hidden md:block"
            action={async () => {
                'use server';
                await signOut();
            }}
        >
            <button className="self-${position} flex items-center justify-center rounded-[30px] border border-fogGrey px-5 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px]">
                Log Out
            </button>
        </form>
    );
};
