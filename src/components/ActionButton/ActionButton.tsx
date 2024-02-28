import { FC, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

interface ActionButtonProps {
    text: string;
    handleCloseModal: () => void;
}
export const ActionButton: FC<ActionButtonProps> = ({
    text,
    handleCloseModal,
}) => {
    const { pending } = useFormStatus();

    useEffect(() => {
        if (pending) {
            toast.success('Add Book Success');
            handleCloseModal();
        }
    }, [handleCloseModal, pending]);

    return (
        <button
            className="flex items-center justify-center self-center rounded-[30px] border border-fogGrey px-5 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px] "
            type="submit"
            aria-disabled={pending}
        >
            {text}
        </button>
    );
};
