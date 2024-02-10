import { Dashboard } from '@/components/Dashboard/Dashboard';
import { MyLibrary } from '@/components/MyLibrary/MyLibrary';
import { DashboardLibrary } from '@/components/DashboardLibrary/DashboardLibrary';

const libraryPage = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 xl:flex-row">
            <Dashboard>
                <DashboardLibrary />
            </Dashboard>
            <MyLibrary />
        </div>
    );
};

export default libraryPage;
