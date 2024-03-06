import { FC } from 'react';

interface InputFilterProps {
    type?: string;
    name: string;
    textLabel: string;
    placeholder: string;
    paddingLeft: string;
    mobilePaddingLeft: string;
}
export const InputFilter: FC<InputFilterProps> = ({
    type = 'text',
    name,
    textLabel,
    placeholder,
    paddingLeft,
    mobilePaddingLeft,
}) => {
    return (
        <label className="relative w-full  text-xs font-medium  leading-[16px] -tracking-[0.24px] text-lightGrey md:text-sm md:leading-[18px] md:-tracking-[0.28px]">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`w-full rounded-xl bg-mediumGrey py-[14px]  ${mobilePaddingLeft}  ${paddingLeft} border border-transparent pr-[14px] font-medium leading-[16px] -tracking-[0.24px] text-fogWhite outline-none transition-all duration-300 placeholder:text-xs placeholder:text-fogWhite hover:border-fogGreyHover md:py-4 md:placeholder:text-sm `}
            />
            <span className="absolute left-[14px] top-1/2 -translate-y-1/2 transform ">
                {textLabel}
            </span>
        </label>
    );
};
