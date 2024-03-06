'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { links } from '@/utils/dataLinks';

import Modal from '../Modal/Modal';
import { ModalLogOut } from '../ModalLogOut/ModalLogOut';

export const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const pathname = usePathname();

    const toggleMenu = () => {
        const body = document.body;
        const newOverflow =
            body.style.overflow === 'hidden' ? 'auto' : 'hidden';

        body.style.overflow = newOverflow;
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    return (
        <>
            <div className=" flex gap-[10px] md:hidden">
                <HiOutlineMenuAlt3
                    size={30}
                    onClick={toggleMenu}
                    className="size-7 text-fogWhite"
                />
            </div>
            {isOpen && (
                <div className="absolute right-0 top-0 z-10 min-h-screen min-w-[50%] bg-mediumGrey px-10 pb-10 pt-8">
                    <CgClose
                        size={28}
                        onClick={toggleMenu}
                        className="absolute right-10 top-9 text-fogWhite"
                    />
                    <div className="mt-[218px] flex flex-col items-center">
                        <nav className=" flex flex-col items-center gap-6 md:hidden">
                            {links.map(link => (
                                <Link
                                    onClick={toggleMenu}
                                    key={link.name}
                                    href={link.href}
                                    className={clsx(
                                        'cursor-pointer  text-base font-medium leading-[18px] -tracking-[0.32px] transition-all duration-300   hover:text-fogWhite',
                                        {
                                            ' rounded-sm  border-b-[3px] border-blue  pb-1 text-fogWhite':
                                                pathname === link.href,
                                            ' ': pathname !== link.href,
                                        },
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-[30px] border border-fogGrey px-4 py-[10px] text-sm font-bold leading-[18px] tracking-[0.28px] text-fogWhite transition-colors duration-300 hover:border-fogWhite hover:bg-fogWhite hover:text-darkGrey md:px-7 md:py-3 md:text-base md:leading-[18px] md:tracking-[0.32px]"
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
                </div>
            )}
        </>
    );
};
