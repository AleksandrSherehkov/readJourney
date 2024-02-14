import React, { useEffect, useRef } from 'react';

interface InputFormProps {
    type: string;
    name: string;
    label: string;
    errorMessage?: string;
}

export const InputForm: React.FC<InputFormProps> = ({
    type,
    name,
    label,
    errorMessage,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current && labelRef.current) {
            const labelWidth = labelRef.current.getBoundingClientRect().width;
            console.log(labelWidth);
            inputRef.current.style.paddingLeft = `${labelWidth + 24}px`;
        }
    }, [label]);

    return (
        <label className="relative flex flex-col items-center justify-center">
            <span
                ref={labelRef as unknown as React.RefObject<HTMLLabelElement>}
                className="absolute left-[14px] top-[35%] text-xs font-medium leading-[14px] tracking-textForm text-lightGrey"
            >
                {label}
            </span>

            <input
                name={name}
                ref={inputRef}
                type={type}
                className="w-full rounded-xl border-[1px] border-mediumGrey bg-mediumGrey py-[14px] pr-8 text-xs font-medium leading-[14px] tracking-textForm text-fogWhite outline-none transition-all duration-300 hover:border-[1px] hover:border-fogWhiteHover focus:border-[1px] focus:border-fogWhiteHover"
                autoComplete="off"
            />
            <div
                className="absolute left-4 top-full mt-0 text-xs text-rose-500"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
            </div>
        </label>
    );
};
