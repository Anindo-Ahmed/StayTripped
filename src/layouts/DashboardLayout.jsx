import { Outlet } from "react-router-dom";
import Sidebar from "../components/Shared/Sidebar/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen md:flex">
            <div>
               <Sidebar></Sidebar>
            </div>
            <div className="flex-1 md:ml-64">
                <Outlet/>
            </div>
        </div>
    );
};

export default DashboardLayout;