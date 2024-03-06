'use client';

import { useEffect, FC } from 'react';

import { IoMdClose } from 'react-icons/io';

import { ModalPortal } from '../ModalPortal/ModalPortal';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
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
        <ModalPortal>
            <div
                className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-auto bg-transparent px-5"
                onClick={handleBackdropClick}
            >
                <div className="md-[50px] relative w-[335px] rounded-xl border border-liteGrey bg-darkGrey p-10 md:w-[342px] ">
                    <button
                        type="button"
                        className="absolute right-5 top-5 transition-transform duration-300 hover:scale-125"
                        onClick={onClose}
                    >
                        <IoMdClose size={22} className="fill-fogWhite" />
                    </button>
                    {children}
                </div>
            </div>
        </ModalPortal>
    );
};

export default Modal;
