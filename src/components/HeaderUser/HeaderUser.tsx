'use client';
import { useEffect, useState } from 'react';

import { getCurrentUser } from '@/services/api';
import { UserResponse } from '@/utils/definitions';

export const HeaderUser = () => {
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getCurrentUser();
            setUser(data);
        };
        fetchUser();
    }, []);

    return (
        <div className="flex items-center gap-[10px]">
            <div className="flex  size-[35px] items-center justify-center rounded-full border-[1px] border-lightGrey md:size-10">
                <span className=" text-base/5 font-bold text-fogWhite">
                    {user?.name[0].toUpperCase()}
                </span>
            </div>
            <p className="hidden text-base font-bold leading-[18px] -tracking-[0.32px] text-fogWhite xl:block">
                {user?.name}
            </p>
        </div>
    );
};
