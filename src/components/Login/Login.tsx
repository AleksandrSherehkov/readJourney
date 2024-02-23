import Image from 'next/image';
import React, { FC } from 'react';
interface LoginProps {
    text?: string;
}

export const Login: FC<LoginProps> = ({ text }) => {
    return (
        <div className="flex items-center gap-1">
            <Image
                src="/assets/image/icon.svg"
                width={42}
                height={17}
                alt="logo"
            />
            <p className="hidden text-lg font-bold uppercase leading-[18px] tracking-titleLogo text-fogWhite md:block">
                {text}
            </p>
        </div>
    );
};
