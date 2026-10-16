import React from "react";
import { Outlet } from "react-router-dom";

import "./AuthLayout.css";

function AuthLayout() {
    return (
        <main className="auth-layout">
            <div className="auth-layout-background">
                <div className="auth-layout-circle auth-layout-circle-one"></div>
                <div className="auth-layout-circle auth-layout-circle-two"></div>
            </div>

            <div className="auth-layout-content">
                <Outlet />
            </div>
        </main>
    );
}

export default AuthLayout;