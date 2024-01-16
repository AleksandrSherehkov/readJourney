import { FC } from "react";

export const Container: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="max-w-7xl mx-auto p-5 md:p-8">{children}</div>;
};
