import Image from 'next/image';

import { TitleDescription } from '../TitleDescription/TitleDescription';

import star from '../../../public/assets/image/star.png';

export const ProgressStar = () => {
    return (
        <div className="mb-5 md:mb-[52px] xl:mb-[170px]">
            <TitleDescription text="Progress" />
            <p className="mt-3.5 text-sm/[18px] font-medium -tracking-[0.28px] text-lightGrey">
                Here you will see when and how much you read. To record, click
                on the red button below.
            </p>
            <div className="m-auto mt-5 flex size-20 items-center justify-center rounded-full bg-mediumGrey md:mt-[50px] md:size-[100px] xl:md:mt-[60px]">
                <Image
                    src={star}
                    width={32}
                    height={32}
                    alt="Star"
                    className="rounded-full"
                />
            </div>
        </div>
    );
};
