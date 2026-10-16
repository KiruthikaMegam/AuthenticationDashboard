import React from "react";
import {
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader/Loader";

import "./ProtectedRoute.css";

function ProtectedRoute() {

    const {
        isAuthenticated,
        loading
    } = useAuth();

    const location = useLocation();


    if (loading) {

        return (
            <div className="protected-route-loading">

                <Loader />

                <p>
                    Checking your session...
                </p>

            </div>
        );

    }


    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname
                }}
            />
        );

    }


    return <Outlet />;
}

export default ProtectedRoute;