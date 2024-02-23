import star from '../../../public/assets/image/star.png';
import Image from 'next/image';
import { TitleDescription } from '../TitleDescription/TitleDescription';

export const ProgressStar = () => {
    return (
        <>
            <TitleDescription text="Progress" />
            <p className="mt-3.5 text-sm/[18px] font-medium -tracking-[0.28px] text-lightGrey">
                Here you will see when and how much you read. To record, click
                on the red button below.
            </p>
            <div className="mt-5 flex items-center justify-center md:mb-[52px] md:mt-[50px] xl:md:mt-[60px] xl:mb-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-mediumGrey">
                    <Image
                        src={star}
                        width={32}
                        height={32}
                        alt="Star"
                        className="rounded-full"
                    />
                </div>
            </div>
        </>
    );
};
