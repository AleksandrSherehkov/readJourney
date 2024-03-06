'use client';
import { useState } from 'react';

import Modal from '../Modal/Modal';
import { ModalLogOut } from '../ModalLogOut/ModalLogOut';

export const LogOut = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="hidden md:block">
                <button
                    type="button"
                    className="self-${position} flex items-center justify-center rounded-[30px] border border-fogGrey px-5 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px]"
                    onClick={handleOpenModal}
                >
                    Log Out
                </button>
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <ModalLogOut onClose={handleCloseModal} />
                </Modal>
            )}
        </>
    );
};
