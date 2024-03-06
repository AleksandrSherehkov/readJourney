'use client';

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { registerNewUser } from '@/services/actions';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useNameValidation } from '@/hooks/useNameValidation';

import { InputForm } from '../InputForm/InputForm';
import { Login } from '@/components/Login/Login';
import { TitleAuth } from '../TitleAuth/TitleAuth';
import { LinkAuth } from '../LinkAuth/LinkAuth';
import { VisibilityPassword } from '../VisibilityPassword/VisibilityPassword';
import { ButtonAuth } from '../ButtonAuth/ButtonAuth';

export const RegisterForm = () => {
    const [errorMessage, dispatch] = useFormState(registerNewUser, undefined);

    const { nameValid, validateName } = useNameValidation();
    const { emailValid, validateEmail } = useEmailValidation();
    const { passwordValid, validatePassword } = usePasswordValidation();
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { pending } = useFormStatus();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full rounded-[30px] bg-darkGrey p-5 pb-10 md:px-16 md:pb-[214px] md:pt-10 xl:py-10">
            <Login text="read journey" />
            <div className="max-w-[472px]">
                <TitleAuth text="Expand your mind, reading" span="a book" />
                <form
                    action={dispatch}
                    className="flex flex-col gap-6 md:gap-[82px]"
                >
                    <div>
                        <div className="relative flex flex-col gap-4">
                            <InputForm
                                type="text"
                                name="name"
                                label="Name:"
                                errorMessage={errorMessage}
                                validate={validateName}
                            />
                            <InputForm
                                type="text"
                                name="email"
                                label="Mail:"
                                errorMessage={errorMessage}
                                validate={validateEmail}
                            />
                            <InputForm
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                label="Password:"
                                errorMessage={errorMessage}
                                validate={validatePassword}
                                onTouchChange={touched =>
                                    setPasswordTouched(touched)
                                }
                            />
                            <VisibilityPassword
                                showPassword={showPassword}
                                toggleShowPassword={toggleShowPassword}
                                passwordTouched={passwordTouched}
                            />
                        </div>
                        {errorMessage && (
                            <p className="ml-4 mt-4 text-[10px]  text-red md:text-xs ">
                                {errorMessage}
                            </p>
                        )}
                    </div>

                    <div className="flex w-full items-center justify-center gap-3 md:justify-start md:gap-5">
                        <ButtonAuth
                            pending={pending}
                            emailValid={emailValid}
                            passwordValid={passwordValid}
                            nameValid={nameValid}
                            text="Registration"
                        />
                        <LinkAuth
                            href="/login"
                            text="Already have an account?"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
