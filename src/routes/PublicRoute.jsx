import React from "react";
import {
    Navigate,
    Outlet
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader/Loader";

import "./PublicRoute.css";

function PublicRoute() {

    const {
        isAuthenticated,
        loading
    } = useAuth();


    if (loading) {

        return (
            <div className="public-route-loading">

                <Loader />

                <p>
                    Loading...
                </p>

            </div>
        );

    }


    if (isAuthenticated) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );

    }


    return <Outlet />;
}

export default PublicRoute;