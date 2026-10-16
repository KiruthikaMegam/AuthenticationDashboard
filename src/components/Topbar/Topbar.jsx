import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Topbar.css";

function Topbar({ onMenuClick }) {
    const location = useLocation();

    const { user } = useAuth();

    const [search, setSearch] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Page title
    const getPageTitle = () => {
        const path = location.pathname;

        if (path === "/dashboard") {
            return "Dashboard";
        }

        if (path === "/profile") {
            return "My Profile";
        }

        if (path === "/profile/edit") {
            return "Edit Profile";
        }

        if (path === "/change-password") {
            return "Change Password";
        }

        return "Dashboard";
    };

    // Open or close notifications
    const toggleNotifications = () => {
        setShowNotifications((previous) => !previous);
        setShowProfileMenu(false);
    };

    // Open or close profile menu
    const toggleProfileMenu = () => {
        setShowProfileMenu((previous) => !previous);
        setShowNotifications(false);
    };

    // Cancel notifications
    const closeNotifications = () => {
        setShowNotifications(false);
    };

    // Cancel profile dropdown
    const closeProfileMenu = () => {
        setShowProfileMenu(false);
    };

    // Close dropdowns after navigation
    const handleProfileNavigation = () => {
        setShowProfileMenu(false);
        setShowNotifications(false);
    };

    const avatarLetter = user?.name
        ? user.name.charAt(0).toUpperCase()
        : "U";

    return (
        <header className="dashboard-topbar">

            {/* LEFT SECTION */}
            <div className="topbar-left">

                <button
                    type="button"
                    className="topbar-menu-button"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                >
                    ☰
                </button>

                <div className="topbar-page-title">
                    <h1>{getPageTitle()}</h1>

                    <span>
                        Authentication &amp; User Access
                    </span>
                </div>

            </div>

            {/* RIGHT SECTION */}
            <div className="topbar-right">

                {/* SEARCH */}
                <div className="topbar-search">
                    {/* Add your SearchBar here when needed. */}
                </div>

                {/* NOTIFICATIONS */}
                <div className="topbar-notification-wrapper">

                    <button
                        type="button"
                        className="topbar-icon-button"
                        onClick={toggleNotifications}
                        aria-label="Toggle notifications"
                        aria-expanded={showNotifications}
                    >
                        <span className="notification-symbol">
                            ♧
                        </span>

                        <span className="notification-dot">
                            3
                        </span>
                    </button>

                    {showNotifications && (
                        <div
                            className="notification-panel"
                            role="dialog"
                            aria-label="Notifications"
                        >

                            {/* NOTIFICATION HEADER */}
                            <div className="notification-header">

                                <div>
                                    <strong>Notifications</strong>

                                    <span className="notification-subtitle">
                                        Stay updated with your account
                                    </span>
                                </div>

                                <div className="notification-header-actions">
                                    <span className="notification-count">
                                        3 new
                                    </span>

                                    <button
                                        type="button"
                                        className="topbar-cancel-button"
                                        onClick={closeNotifications}
                                        aria-label="Close notifications"
                                        title="Close notifications"
                                    >
                                        ×
                                    </button>
                                </div>

                            </div>

                            {/* NOTIFICATION ITEM 1 */}
                            <div className="notification-item">

                                <div className="notification-item-icon success-icon">
                                    ✓
                                </div>

                                <div className="notification-item-content">
                                    <strong>
                                        Login successful
                                    </strong>

                                    <span>
                                        Your account was accessed.
                                    </span>

                                    <small>Just now</small>
                                </div>

                            </div>

                            {/* NOTIFICATION ITEM 2 */}
                            <div className="notification-item">

                                <div className="notification-item-icon warning-icon">
                                    !
                                </div>

                                <div className="notification-item-content">
                                    <strong>
                                        Security reminder
                                    </strong>

                                    <span>
                                        Keep your password secure.
                                    </span>

                                    <small>Recently</small>
                                </div>

                            </div>

                            {/* NOTIFICATION ITEM 3 */}
                            <div className="notification-item">

                                <div className="notification-item-icon info-icon">
                                    i
                                </div>

                                <div className="notification-item-content">
                                    <strong>
                                        Profile update
                                    </strong>

                                    <span>
                                        Your profile is ready to review.
                                    </span>

                                    <small>Recently</small>
                                </div>

                            </div>

                            {/* NOTIFICATION FOOTER */}
                            <div className="notification-footer">

                                <button
                                    type="button"
                                    onClick={closeNotifications}
                                >
                                    Close notifications
                                </button>

                            </div>

                        </div>
                    )}

                </div>

                {/* PROFILE */}
                <div className="topbar-profile-wrapper">

                    <button
                        type="button"
                        className="topbar-profile"
                        onClick={toggleProfileMenu}
                        aria-label="Toggle profile menu"
                        aria-expanded={showProfileMenu}
                    >

                        <div className="topbar-avatar">
                            {avatarLetter}
                        </div>

                        <div className="topbar-profile-info">

                            <strong>
                                {user?.name || "User"}
                            </strong>

                            <span>
                                {user?.role || "User"}
                            </span>

                        </div>

                        <span className="profile-arrow">
                            {showProfileMenu ? "⌃" : "⌄"}
                        </span>

                    </button>

                    {showProfileMenu && (
                        <div
                            className="profile-dropdown"
                            role="dialog"
                            aria-label="Profile menu"
                        >

                            {/* PROFILE DROPDOWN HEADER */}
                            <div className="profile-dropdown-heading">

                                <div className="topbar-avatar large">
                                    {avatarLetter}
                                </div>

                                <div className="profile-dropdown-user-info">

                                    <strong>
                                        {user?.name || "User"}
                                    </strong>

                                    <span>
                                        {user?.email || ""}
                                    </span>

                                    <small>
                                        {user?.role || "User"}
                                    </small>

                                </div>

                                <button
                                    type="button"
                                    className="topbar-cancel-button profile-cancel-button"
                                    onClick={closeProfileMenu}
                                    aria-label="Close profile menu"
                                    title="Close profile menu"
                                >
                                    ×
                                </button>

                            </div>

                            {/* PROFILE LINKS */}
                            <div className="profile-dropdown-links">

                                <Link
                                    to="/profile"
                                    onClick={handleProfileNavigation}
                                >
                                    <span className="profile-link-icon">
                                        ◉
                                    </span>

                                    My Profile
                                </Link>

                                <Link
                                    to="/profile/edit"
                                    onClick={handleProfileNavigation}
                                >
                                    <span className="profile-link-icon">
                                        ✎
                                    </span>

                                    Edit Profile
                                </Link>

                                <Link
                                    to="/change-password"
                                    onClick={handleProfileNavigation}
                                >
                                    <span className="profile-link-icon">
                                        ◈
                                    </span>

                                    Change Password
                                </Link>

                            </div>

                            {/* PROFILE FOOTER */}
                            <div className="profile-dropdown-footer">

                                <button
                                    type="button"
                                    onClick={closeProfileMenu}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Topbar;