import { FC } from 'react';

interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard: FC<DashboardProps> = ({ children }) => {
  return (
    <div className="bg-darkGrey p-5 md:p-8 xl:py-1 md:px-5 w-full xl:w-1/3 rounded-[30px] ">
      {children}
    </div>
  );
};
