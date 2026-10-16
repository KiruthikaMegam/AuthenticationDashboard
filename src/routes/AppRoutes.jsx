import React from "react";
import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

import Dashboard from "../pages/Dashboard/Dashboard";

import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

import Users from "../pages/Users/Users";
import UserAdd from "../pages/UserAdd/UserAdd";
import UserView from "../pages/UserView/UserView";
import UserEdit from "../pages/UserEdit/UserEdit";


/* =====================================================
   PROTECTED ROUTE
===================================================== */

function ProtectedRoute({ children }) {

    const {
        isAuthenticated,
        loading
    } = useAuth();


    if (loading) {

        return (
            <div className="route-loading">
                Loading...
            </div>
        );

    }


    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return children;
}


/* =====================================================
   PUBLIC ROUTE
===================================================== */

function PublicRoute({ children }) {

    const {
        isAuthenticated,
        loading
    } = useAuth();


    if (loading) {

        return (
            <div className="route-loading">
                Loading...
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


    return children;
}


/* =====================================================
   APP ROUTES
===================================================== */

function AppRoutes() {

    return (
        <Routes>

            {/* =================================================
                PUBLIC / AUTH ROUTES
            ================================================= */}

            <Route
                element={<AuthLayout />}
            >

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/reset-password"
                    element={
                        <PublicRoute>
                            <ResetPassword />
                        </PublicRoute>
                    }
                />

            </Route>


            {/* =================================================
                PROTECTED DASHBOARD ROUTES
            ================================================= */}

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                {/* =================================================
                    DASHBOARD
                ================================================= */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


                {/* =================================================
                    PROFILE
                ================================================= */}

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/profile/edit"
                    element={<EditProfile />}
                />

                <Route
                    path="/change-password"
                    element={<ChangePassword />}
                />


                {/* =================================================
                    USERS
                ================================================= */}

                {/* Users List */}

                <Route
                    path="/users"
                    element={<Users />}
                />


                {/* Add User */}

                <Route
                    path="/users/add"
                    element={<UserAdd />}
                />


                {/* View User */}

                <Route
                    path="/users/view/:id"
                    element={<UserView />}
                />


                {/* Edit User */}

                <Route
                    path="/users/edit/:id"
                    element={<UserEdit />}
                />

            </Route>


            {/* =================================================
                ROOT ROUTE
            ================================================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />


            {/* =================================================
                404 ROUTE
            ================================================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

        </Routes>
    );
}


export default AppRoutes;