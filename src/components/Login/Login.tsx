import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
interface LoginProps {
    text?: string;
}

export const Login: FC<LoginProps> = ({ text }) => {
    return (
        <Link href="/" className="flex items-center gap-1">
            <Image
                src="/assets/image/icon.svg"
                width={42}
                height={17}
                alt="logo"
            />
            <p className="hidden text-lg font-bold uppercase leading-[18px] tracking-titleLogo text-fogWhite md:block">
                {text}
            </p>
        </Link>
    );
};
