import { Dashboard } from '@/components/Dashboard/Dashboard';
import { MyLibrary } from '@/components/MyLibrary/MyLibrary';
import { DashboardLibrary } from '@/components/DashboardLibrary/DashboardLibrary';
import Header from '@/components/Header/Header';

const libraryPage = () => {
    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center gap-4 xl:flex-row">
                <Dashboard>
                    <DashboardLibrary />
                </Dashboard>
                <MyLibrary />
            </main>
        </>
    );
};

export default libraryPage;
