import clsx from 'clsx';
import { FC } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

interface VisibilityPasswordProps {
    passwordTouched: boolean;
    toggleShowPassword: () => void;
    showPassword: boolean;
}

export const VisibilityPassword: FC<VisibilityPasswordProps> = ({
    passwordTouched,
    toggleShowPassword,
    showPassword,
}) => {
    return (
        <button
            type="button"
            className={clsx(
                'absolute bottom-[4%] right-[14px] transform cursor-pointer',
                {
                    'right-[40px]': passwordTouched,
                    '': !passwordTouched,
                },
                '-translate-y-1/2',
            )}
            onClick={toggleShowPassword}
        >
            {showPassword ? (
                <LuEye size={18} className="stroke-fogWhite" />
            ) : (
                <LuEyeOff size={18} className="stroke-fogWhite" />
            )}
        </button>
    );
};
