import Header from '@/components/Header/Header';

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-between p-5">
                <h1 className="mt-[50%] text-center text-[32px] font-bold uppercase leading-8 tracking-titleForm text-fogWhite md:mt-[30%] md:text-[64px] md:leading-[60px] md:tracking-titleFormTablet xl:mt-[25%]">
                    Welcome to <span className="text-grey">read journey</span>
                </h1>
            </main>
        </>
    );
}
