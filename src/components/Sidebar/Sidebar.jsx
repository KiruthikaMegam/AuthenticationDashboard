import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

import "./Sidebar.css";

function Sidebar({ mobileOpen = false, onClose }) {

    const navigate = useNavigate();

    const {
        user,
        logout
    } = useAuth();

    const [showLogoutModal, setShowLogoutModal] =
        useState(false);


    /* =========================
       LOGOUT
    ========================= */

    const handleLogout = async () => {

        setShowLogoutModal(false);

        try {

            await logout();

            navigate("/login", {
                replace: true
            });

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );
        }
    };


    /* =========================
       MOBILE CLOSE
    ========================= */

    const handleMobileClose = () => {

        if (onClose) {
            onClose();
        }
    };


    /* =========================
       NAVIGATION
    ========================= */

    const handleNavigation = () => {

        if (onClose) {
            onClose();
        }
    };


    return (
        <>
            {/* =========================
                MOBILE OVERLAY
            ========================= */}

            {mobileOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={handleMobileClose}
                ></div>
            )}


            {/* =========================
                SIDEBAR
            ========================= */}

            <aside
                className={
                    mobileOpen
                        ? "dashboard-sidebar mobile-open"
                        : "dashboard-sidebar"
                }
            >

                {/* =========================
                    HEADER
                ========================= */}

                <div className="sidebar-header">

                    <div
                        className="sidebar-logo"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        <img
                            src="/assets/logo.png"
                            alt="AuthFlow"
                            className="sidebar-logo-image"
                        />

                        <div className="sidebar-logo-text">

                            <span className="sidebar-logo-name">
                                Auth<span>Flow</span>
                            </span>

                            <small>
                                User Management
                            </small>

                        </div>

                    </div>


                    {/* Mobile Close */}

                    <button
                        type="button"
                        className="sidebar-close-button"
                        onClick={handleMobileClose}
                        aria-label="Close sidebar"
                    >

                        <img
                            src="/assets/close.png"
                            alt="Close"
                        />

                    </button>

                </div>


                {/* =========================
                    NAVIGATION
                ========================= */}

                <div className="sidebar-section">

                    <p className="sidebar-section-title">
                        MAIN MENU
                    </p>


                    <nav className="sidebar-navigation">

                        {/* =========================
                            DASHBOARD
                        ========================= */}

                        <NavLink
                            to="/dashboard"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <img
                                src="/assets/dashboard.png"
                                alt=""
                            />

                            <span>
                                Dashboard
                            </span>

                        </NavLink>


                        {/* =========================
                            USERS
                        ========================= */}

                        <NavLink
                            to="/users"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <img
                                src="/assets/users.png"
                                alt=""
                            />

                            <span>
                                Users
                            </span>

                        </NavLink>


                        {/* =========================
                            PROFILE
                        ========================= */}

                        <NavLink
                            to="/profile"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <img
                                src="/assets/profile-menu.png"
                                alt=""
                            />

                            <span>
                                My Profile
                            </span>

                        </NavLink>


                        {/* =========================
                            EDIT PROFILE
                        ========================= */}

                        <NavLink
                            to="/profile/edit"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <img
                                src="/assets/edit.png"
                                alt=""
                            />

                            <span>
                                Edit Profile
                            </span>

                        </NavLink>


                        {/* =========================
                            CHANGE PASSWORD
                        ========================= */}

                        <NavLink
                            to="/change-password"
                            onClick={handleNavigation}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <img
                                src="/assets/lock.png"
                                alt=""
                            />

                            <span>
                                Change Password
                            </span>

                        </NavLink>

                    </nav>

                </div>


                {/* =========================
                    BOTTOM AREA
                ========================= */}

                <div className="sidebar-bottom">

                    {/* =========================
                        USER CARD
                    ========================= */}

                    <div className="sidebar-user-card">

                        <div className="sidebar-user-avatar">

                            {user?.name
                                ? user.name
                                      .charAt(0)
                                      .toUpperCase()
                                : "A"}

                        </div>


                        <div className="sidebar-user-details">

                            <h4>
                                {user?.name ||
                                    "Administrator"}
                            </h4>

                            <p>
                                {user?.role ||
                                    "Administrator"}
                            </p>

                        </div>

                    </div>


                    {/* =========================
                        LOGOUT
                    ========================= */}

                    <button
                        type="button"
                        className="sidebar-logout"
                        onClick={() =>
                            setShowLogoutModal(true)
                        }
                    >

                        <img
                            src="/assets/logout.png"
                            alt=""
                        />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* =========================
                LOGOUT CONFIRMATION
            ========================= */}

            <ConfirmModal
                isOpen={showLogoutModal}
                title="Logout"
                message="Are you sure you want to logout from your account?"
                confirmText="Logout"
                cancelText="Cancel"
                type="danger"
                onConfirm={handleLogout}
                onCancel={() =>
                    setShowLogoutModal(false)
                }
            />

        </>
    );
}

export default Sidebar;