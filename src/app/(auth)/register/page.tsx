
import Image from 'next/image';

import { RegisterForm } from '@/components/Auth/RegisterForm/RegisterForm';

const page = () => {
    return (
        <div className="flex flex-col gap-[10px] xl:flex-row xl:gap-4">
            <RegisterForm />
            <div className="flex w-full justify-center rounded-[30px] bg-darkGrey px-10 pt-5 md:hidden xl:flex xl:items-end xl:px-[98px] xl:pt-[80px]">
                <Image
                    src="/assets/image/iPhone 15 Black 1phone@2x.png"
                    width={255}
                    height={518}
                    alt="phone"
                    className="block xl:hidden"
                />
                <Image
                    src="/assets/image/iPhone 15 Blackdesk@2x.png"
                    width={405}
                    height={835}
                    alt="phone"
                    className="hidden xl:block"
                />
            </div>
        </div>
    );
};

export default page;
