import { FC } from 'react';
import { useFormState } from 'react-dom';

import { signOutUser } from '@/services/actions';
import { Button } from '../Button/Button';

interface ModalLogOutProps {
    onClose: () => void;
}

export const ModalLogOut: FC<ModalLogOutProps> = ({ onClose }) => {
    const [, dispatch] = useFormState(signOutUser, undefined);
    return (
        <>
            <h3 className="mb-[14%] mt-4 text-center text-2xl font-bold leading-normal text-fogWhite md:text-4xl">
                Are you sure{' '}
                <span className="text-grey"> that you want to </span>
                sign out?
            </h3>
            <div className="flex justify-around">
                <form action={dispatch}>
                    <button className="self-${position} flex items-center justify-center rounded-[30px] border border-fogGrey px-5 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px]">
                        Yes
                    </button>
                </form>
                <Button type="button" text="No" onClick={onClose} />
            </div>
        </>
    );
};
