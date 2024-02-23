'use client';

import Image from 'next/image';
import Like2 from '../../../public/assets/image/Like2.png';
import { IoMdClose } from 'react-icons/io';
import { FC, useEffect } from 'react';

interface ModalAddBookProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalAddBook: FC<ModalAddBookProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (
        <div
            onClick={handleBackdropClick}
            className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center overflow-auto bg-[#14141499] px-5"
        >
            <div className="relative flex h-[272px] w-[335px] flex-col items-center justify-center rounded-xl border border-lightGrey bg-darkGrey">
                <Image
                    src={Like2}
                    alt="like"
                    width={50}
                    height={50}
                    className="pb-5"
                />
                <h2 className="pb-[10px] text-lg/3 font-bold text-fogWhite">
                    Good job
                </h2>
                <p className="leading-[18px]text-lightGrey text-center text-sm font-medium">
                    Your book is now in{' '}
                    <span className="text-fogWhite">the library!</span> The joy{' '}
                    <br /> knows no bounds and now you can <br /> start your
                    training
                </p>
                <button
                    onClick={onClose}
                    type="button"
                    className="absolute right-5 top-5 transition-transform duration-300 hover:scale-125"
                >
                    <IoMdClose size={22} className="fill-fogWhite" />
                </button>
            </div>
        </div>
    );
};
