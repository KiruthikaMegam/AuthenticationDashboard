import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

import "./DashboardLayout.css";

function DashboardLayout() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const openSidebar = () => {
        setMobileSidebarOpen(true);
    };

    const closeSidebar = () => {
        setMobileSidebarOpen(false);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar
                mobileOpen={mobileSidebarOpen}
                onClose={closeSidebar}
            />

            <div className="dashboard-layout-main">
                <Topbar onMenuClick={openSidebar} />

                <main className="dashboard-layout-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;