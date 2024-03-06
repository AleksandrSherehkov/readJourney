'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { links } from '@/utils/dataLinks';

export const HeaderNavLink = () => {
    const pathname = usePathname();

    return (
        <nav className="hidden flex-col items-center gap-6 md:flex md:flex-row md:gap-8">
            {links.map(link => (
                <Link
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
    );
};
