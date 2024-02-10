import { FC } from 'react';

export const Container: FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="mx-auto max-w-7xl p-5 md:p-8">{children}</div>;
};
