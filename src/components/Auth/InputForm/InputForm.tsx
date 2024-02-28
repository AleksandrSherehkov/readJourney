import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdErrorOutline } from 'react-icons/md';

interface InputFormProps {
    type: string;
    name: string;
    label: string;
    errorMessage?: string;
    validate?: (value: string) => string | undefined;
    onTouchChange?: (touched: boolean) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
    type,
    name,
    label,
    errorMessage,
    validate,
    onTouchChange,
}) => {
    const [localErrorMessage, setLocalErrorMessage] = useState<
        string | undefined
    >(errorMessage);
    const [touched, setTouched] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current && labelRef.current) {
            const labelWidth = labelRef.current.getBoundingClientRect().width;
            inputRef.current.style.paddingLeft = `${labelWidth + 24}px`;
        }
    }, [label]);

    const handleBlur = () => {
        setTouched(true);
        if (validate && inputRef.current) {
            const validationError = validate(inputRef.current.value);
            setLocalErrorMessage(validationError);
            onTouchChange?.(true);
        }
    };

    const handleChange = () => {
        if (!touched) setTouched(true);
        if (validate && inputRef.current) {
            const validationError = validate(inputRef.current.value);
            setLocalErrorMessage(validationError);
            onTouchChange?.(true);
        }
    };

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
                onBlur={handleBlur}
                onChange={handleChange}
                className={clsx(
                    'w-full rounded-xl border border-mediumGrey  bg-mediumGrey py-[14px] pr-8 text-xs font-medium leading-[14px] tracking-textForm text-fogWhite outline-none transition-all duration-300 hover:border-[1px] hover:border-fogWhiteHover focus:border focus:border-fogWhiteHover',
                    {
                        ' border !border-lightGreen hover:border-lightGreen focus:border-lightGreen':
                            !localErrorMessage && touched,
                        ' border-red hover:border-red focus:border-red':
                            localErrorMessage && touched,
                    },
                )}
                autoComplete="off"
            />
            <div
                className="absolute left-4 top-full mt-0 text-xs text-rose-500"
                aria-live="polite"
                aria-atomic="true"
            >
                {localErrorMessage && (
                    <p className="text-[10px] text-red md:text-xs">
                        {localErrorMessage}
                    </p>
                )}
            </div>
            <div className="pointer-events-none absolute right-[14px] top-[50%] translate-y-[-50%]">
                {touched &&
                    (localErrorMessage ? (
                        <MdErrorOutline className="fill-red" size={16} />
                    ) : (
                        <FaRegCircleCheck
                            className="fill-lightGreen"
                            size={16}
                        />
                    ))}
            </div>
        </label>
    );
};
