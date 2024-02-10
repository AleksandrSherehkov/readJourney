'use client';

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LuEyeOff, LuEye } from 'react-icons/lu';
import { validationSchema } from '@/utils/registerShema';
import { InputForm } from '../InputForm/InputForm';
import Image from 'next/image';

// interface Values {
//     name: string;
//     email: string;
//     password: string;
// }

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const initialValues = { email: '', password: '' };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <div className="w-full rounded-[30px] bg-darkGrey p-5 pb-10 md:px-16 md:pb-[214px] md:pt-10 xl:py-10">
            <div className="mb-10 flex items-center gap-1 md:mb-[157px] xl:mb-[107px]">
                <Image
                    src="/assets/image/icon.svg"
                    width={42}
                    height={17}
                    alt="logo"
                />
                <p className="hidden text-lg font-bold uppercase leading-[18px] tracking-titleLogo text-fogWhite md:block">
                    read journey
                </p>
            </div>
            <div className="max-w-[472px]">
                <p className="mb-5 text-[32px] font-bold leading-8 tracking-titleForm text-fogWhite md:mb-10 md:text-[64px] md:leading-[60px] md:tracking-titleFormTablet">
                    Expand your mind, reading
                    <span className="text-grey"> a book</span>
                </p>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="flex flex-col gap-[72px] md:gap-[146px]">
                        <div className="relative flex flex-col gap-4">
                            <Field
                                type="email"
                                name="email"
                                label="Mail:"
                                component={InputForm}
                            />
                            <Field
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                label="Password:"
                                component={InputForm}
                            />
                            <div
                                className="absolute bottom-[4%] right-[14px] -translate-y-1/2 transform cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <LuEye
                                        size={18}
                                        className="stroke-fogWhite"
                                    />
                                ) : (
                                    <LuEyeOff
                                        size={18}
                                        className="stroke-fogWhite"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-center gap-[14px] md:justify-start md:gap-5">
                            <button
                                type="submit"
                                className="rounded-[30px] border-[2px] border-inherit bg-fogWhite px-[44px] py-[11px] text-[14px] font-bold leading-[18px] tracking-textButton text-darkGrey transition-all duration-300 hover:border-[2px] hover:border-fogWhiteHover hover:bg-inherit hover:text-fogWhite md:px-[53px] md:py-[15px] md:text-[20px]"
                            >
                                Log in
                            </button>
                            <a
                                href=""
                                className="text-xs font-medium leading-[14px] tracking-textForm text-lightGrey underline transition-all duration-300 hover:text-fogWhite md:text-sm md:leading-[18px] md:tracking-textFormTablet"
                            >
                                Don&#8217;t have an account?
                            </a>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
