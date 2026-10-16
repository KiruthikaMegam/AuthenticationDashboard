import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import StatCard from "../../components/StatCard/StatCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import ErrorState from "../../components/ErrorState/ErrorState";

import usersData from "../../data/usersData";

import "./Dashboard.css";

function Dashboard() {

    const { user } = useAuth();

    const navigate = useNavigate();


    /* =========================
       STATES
    ========================= */

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const [search, setSearch] = useState("");

    const [dashboardData, setDashboardData] = useState({
        stats: [],
        recentUsers: [],
        recentActivity: []
    });


    /* =========================
       LOAD DASHBOARD
    ========================= */

    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = () => {

        setLoading(true);

        setError(false);


        setTimeout(() => {

            try {

                /* =========================
                   CALCULATE USER VALUES
                ========================= */

                let totalUsers = usersData.length;

                let activeUsers = 0;

                let activeSessions = 0;

                let loginAttempts = 0;

                let failedLogins = 0;

                let successfulLogins = 0;


                for (const item of usersData) {

                    if (item.status === "Active") {
                        activeUsers++;
                    }

                    if (item.activeLogin === true) {
                        activeSessions++;
                    }

                    loginAttempts =
                        loginAttempts +
                        Number(item.loginAttempts || 0);

                    failedLogins =
                        failedLogins +
                        Number(item.failedLogins || 0);

                    successfulLogins =
                        successfulLogins +
                        Number(item.successfulLogins || 0);
                }


                /* =========================
                   RECENT USERS
                ========================= */

                const recentUsers = [];

                for (let i = 0; i < usersData.length; i++) {

                    if (i < 8) {

                        recentUsers.push({
                            id: usersData[i].id,
                            name: usersData[i].name,
                            email: usersData[i].email,
                            role: usersData[i].role,
                            status: usersData[i].status,
                            activeLogin: usersData[i].activeLogin,
                            loginAttempts:
                                usersData[i].loginAttempts,
                            failedLogins:
                                usersData[i].failedLogins,
                            lastLogin:
                                usersData[i].lastLogin
                        });
                    }
                }


                /* =========================
                   RECENT ACTIVITY
                ========================= */

                const recentActivity = [];


                if (usersData.length > 0) {

                    recentActivity.push({
                        id: 1,
                        title: "Successful login",
                        description:
                            usersData[0].name +
                            " logged into the dashboard",
                        type: "success",
                        time: usersData[0].lastLogin
                    });
                }


                if (usersData.length > 1) {

                    recentActivity.push({
                        id: 2,
                        title: "Password changed",
                        description:
                            usersData[1].name +
                            " recently changed their password",
                        type: "info",
                        time:
                            usersData[1].passwordChanged
                    });
                }


                if (usersData.length > 2) {

                    recentActivity.push({
                        id: 3,
                        title: "Failed login detected",
                        description:
                            usersData[2].name +
                            " has " +
                            usersData[2].failedLogins +
                            " failed login attempts",
                        type: "error",
                        time:
                            usersData[2].lastLogin
                    });
                }


                if (usersData.length > 3) {

                    recentActivity.push({
                        id: 4,
                        title: "Administrator active",
                        description:
                            usersData[3].name +
                            " is currently logged in",
                        type: "success",
                        time:
                            usersData[3].lastLogin
                    });
                }


                if (usersData.length > 4) {

                    recentActivity.push({
                        id: 5,
                        title: "User account active",
                        description:
                            usersData[4].name +
                            " has successfully logged in",
                        type: "success",
                        time:
                            usersData[4].lastLogin
                    });
                }


                /* =========================
                   DASHBOARD DATA
                ========================= */

                setDashboardData({

                    stats: [

                        {
                            id: 1,
                            title: "Total Users",
                            value: totalUsers.toLocaleString(),
                            description:
                                "Registered accounts",
                            trend: "+12.5%",
                            icon: "U"
                        },

                        {
                            id: 2,
                            title: "Active Sessions",
                            value:
                                activeSessions.toLocaleString(),
                            description:
                                "Currently logged in",
                            trend: "+8.2%",
                            icon: "A"
                        },

                        {
                            id: 3,
                            title: "Login Attempts",
                            value:
                                loginAttempts.toLocaleString(),
                            description:
                                "Total recorded attempts",
                            trend: "+15.4%",
                            icon: "L"
                        },

                        {
                            id: 4,
                            title: "Failed Logins",
                            value:
                                failedLogins.toLocaleString(),
                            description:
                                "Requires attention",
                            trend: "-4.6%",
                            trendType: "negative",
                            icon: "!"
                        }
                    ],

                    recentUsers: recentUsers,

                    recentActivity: recentActivity
                });


                setLoading(false);

            } catch (loadError) {

                console.error(
                    "Dashboard loading failed:",
                    loadError
                );

                setError(true);

                setLoading(false);
            }

        }, 700);
    };


    /* =========================
       SEARCH
    ========================= */

    const normalizedSearch =
        String(search || "").toLowerCase();


    const filteredUsers =
        dashboardData.recentUsers.filter((item) => {

            const name =
                String(item.name || "").toLowerCase();

            const email =
                String(item.email || "").toLowerCase();

            const role =
                String(item.role || "").toLowerCase();

            const status =
                String(item.status || "").toLowerCase();

            return (
                name.includes(normalizedSearch) ||
                email.includes(normalizedSearch) ||
                role.includes(normalizedSearch) ||
                status.includes(normalizedSearch)
            );
        });


    const filteredActivity =
        dashboardData.recentActivity.filter((item) => {

            const title =
                String(item.title || "").toLowerCase();

            const description =
                String(
                    item.description || ""
                ).toLowerCase();

            return (
                title.includes(normalizedSearch) ||
                description.includes(normalizedSearch)
            );
        });


    /* =========================
       SEARCH CHANGE
    ========================= */

    const handleSearchChange = (value) => {

        setSearch(value);
    };


    /* =========================
       VIEW ALL USERS
    ========================= */

    const handleViewAll = () => {

        navigate("/users");
    };


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (

            <div className="dashboard-loading">

                <Loader />

                <p>
                    Loading dashboard...
                </p>

            </div>
        );
    }


    /* =========================
       ERROR
    ========================= */

    if (error) {

        return (

            <div className="dashboard-error">

                <ErrorState
                    title="Unable to load dashboard"
                    message="Something went wrong while loading dashboard information."
                    buttonText="Try Again"
                    onRetry={loadDashboard}
                />

            </div>
        );
    }


    /* =========================
       DASHBOARD
    ========================= */

    return (

        <div className="dashboard-page">

            {/* =========================
                WELCOME
            ========================= */}

            <section className="dashboard-welcome">

                <div>

                    <p className="dashboard-small-title">
                        AUTHENTICATION OVERVIEW
                    </p>


                    <h1>

                        Good morning,{" "}

                        <span>
                            {user?.name ||
                                "Administrator"}
                        </span>{" "}

                        👋

                    </h1>


                    <p className="dashboard-welcome-text">

                        Monitor users, authentication
                        activity and account security
                        from one place.

                    </p>

                </div>


                <div className="dashboard-date">

                    <span>
                        Today
                    </span>


                    <strong>

                        {new Date().toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }
                        )}

                    </strong>

                </div>

            </section>


            {/* =========================
                SEARCH
            ========================= */}

            <section className="dashboard-toolbar">

                <SearchBar
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search users or activity..."
                />

            </section>


            {/* =========================
                STAT CARDS
            ========================= */}

            <section className="dashboard-stats">

                {dashboardData.stats.map((stat) => (

                    <StatCard
                        key={stat.id}
                        title={stat.title}
                        value={stat.value}
                        description={stat.description}
                        trend={stat.trend}
                        trendType={stat.trendType}
                        icon={stat.icon}
                    />

                ))}

            </section>


            {/* =========================
                MAIN SECTIONS
            ========================= */}

            <section className="dashboard-main-sections">


                {/* =========================
                    RECENT USERS
                ========================= */}

                <div className="dashboard-panel users-panel">

                    <div className="dashboard-panel-header">

                        <div>

                            <h2>
                                Recent Users
                            </h2>

                            <p>
                                Latest registered accounts
                            </p>

                        </div>


                        <button
                            type="button"
                            className="dashboard-view-button"
                            onClick={handleViewAll}
                        >
                            View All
                        </button>

                    </div>


                    {filteredUsers.length === 0 ? (

                        <EmptyState
                            title="No users found"
                            message="No users match your search."
                        />

                    ) : (

                        <div className="recent-users-list">

                            {filteredUsers
                                .slice(0, 5)
                                .map((item) => (

                                    <div
                                        className="recent-user"
                                        key={item.id}
                                    >

                                        {/* Avatar */}

                                        <div className="recent-user-avatar">

                                            {item.name
                                                .charAt(0)
                                                .toUpperCase()}

                                        </div>


                                        {/* Details */}

                                        <div className="recent-user-details">

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <p>
                                                {item.email}
                                            </p>

                                        </div>


                                        {/* Role */}

                                        <div className="recent-user-role">

                                            {item.role}

                                        </div>


                                        {/* Status */}

                                        <div
                                            className={
                                                item.status ===
                                                "Active"
                                                    ? "user-status active"
                                                    : "user-status inactive"
                                            }
                                        >

                                            <span></span>

                                            {item.status}

                                        </div>

                                    </div>

                                ))}

                        </div>

                    )}

                </div>


                {/* =========================
                    RECENT ACTIVITY
                ========================= */}

                <div className="dashboard-panel activity-panel">

                    <div className="dashboard-panel-header">

                        <div>

                            <h2>
                                Recent Activity
                            </h2>

                            <p>
                                Latest authentication events
                            </p>

                        </div>


                        <span className="activity-count">

                            {filteredActivity.length}

                        </span>

                    </div>


                    {filteredActivity.length === 0 ? (

                        <EmptyState
                            title="No activity found"
                            message="No activity matches your search."
                        />

                    ) : (

                        <div className="activity-list">

                            {filteredActivity.map((item) => (

                                <div
                                    className="activity-item"
                                    key={item.id}
                                >

                                    <div
                                        className={
                                            "activity-icon " +
                                            item.type
                                        }
                                    >

                                        {item.type ===
                                            "success" &&
                                            "✓"}

                                        {item.type ===
                                            "info" &&
                                            "i"}

                                        {item.type ===
                                            "error" &&
                                            "!"}

                                    </div>


                                    <div className="activity-details">

                                        <h3>
                                            {item.title}
                                        </h3>

                                        <p>
                                            {item.description}
                                        </p>

                                        <span>
                                            {item.time}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </section>


            {/* =========================
                SECURITY
            ========================= */}

            <section className="security-summary">

                <div className="security-summary-content">

                    <div className="security-icon">
                        ✓
                    </div>


                    <div>

                        <h2>
                            Security Status
                        </h2>

                        <p>

                            Your authentication system
                            is operating normally.
                            {` `}
                            {dashboardData.stats[3]?.value ||
                                0}
                            {` `}
                            failed login attempts have
                            been recorded.

                        </p>

                    </div>

                </div>


                <div className="security-status">

                    <span></span>

                    Secure

                </div>

            </section>

        </div>
    );
}

export default Dashboard;