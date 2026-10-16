import React, { useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import { useUsers } from "../../context/UsersContext";

import "./UserView.css";

function UserView() {

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        getUserById
    } = useUsers();

    const user = getUserById(id);

    const [showPassword, setShowPassword] =
        useState(false);


    if (!user) {

        return (
            <div className="user-view-page">

                <div className="user-view-not-found">

                    <h2>
                        User Not Found
                    </h2>

                    <p>
                        The requested user could not be found.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/users")}
                    >
                        Back to Users
                    </button>

                </div>

            </div>
        );
    }


    return (
        <div className="user-view-page">

            <div className="user-view-header">

                <div>

                    <p className="user-view-small-title">
                        USER MANAGEMENT
                    </p>

                    <h1>
                        User Details
                    </h1>

                    <p>
                        View complete account and
                        authentication information.
                    </p>

                </div>


                <div className="user-view-actions">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/users/edit/${user.id}`)
                        }
                    >
                        Edit User
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/users")
                        }
                    >
                        Back
                    </button>

                </div>

            </div>


            <div className="user-view-card">

                <div className="user-view-profile">

                    <div className="user-view-avatar">
                        {user.name
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <h2>
                            {user.name}
                        </h2>

                        <p>
                            {user.email}
                        </p>

                        <span
                            className={
                                user.status === "Active"
                                    ? "user-view-status active"
                                    : "user-view-status inactive"
                            }
                        >
                            {user.status}
                        </span>

                    </div>

                </div>


                {/* BASIC INFORMATION */}

                <section className="user-view-section">

                    <h3>
                        Basic Information
                    </h3>

                    <div className="user-view-details">

                        <div>
                            <span>Full Name</span>
                            <strong>{user.name}</strong>
                        </div>

                        <div>
                            <span>Email</span>
                            <strong>{user.email}</strong>
                        </div>

                        <div>
                            <span>Phone</span>
                            <strong>{user.phone}</strong>
                        </div>

                        <div>
                            <span>Role</span>
                            <strong>{user.role}</strong>
                        </div>

                        <div>
                            <span>Location</span>
                            <strong>{user.location}</strong>
                        </div>

                        <div>
                            <span>Account Type</span>
                            <strong>{user.accountType}</strong>
                        </div>

                        <div>
                            <span>Status</span>
                            <strong>{user.status}</strong>
                        </div>

                        <div>
                            <span>Joined</span>
                            <strong>{user.joined}</strong>
                        </div>

                    </div>

                </section>


                {/* PASSWORD */}

                <section className="user-view-section">

                    <h3>
                        Authentication
                    </h3>

                    <div className="user-view-details">

                        <div className="user-password-detail">

                            <span>
                                Password
                            </span>

                            <strong>
                                {showPassword
                                    ? user.password
                                    : "••••••••"}
                            </strong>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                        <div>
                            <span>Last Login</span>
                            <strong>
                                {user.lastLogin}
                            </strong>
                        </div>

                        <div>
                            <span>Password Changed</span>
                            <strong>
                                {user.passwordChanged}
                            </strong>
                        </div>

                        <div>
                            <span>Active Login</span>
                            <strong>
                                {user.activeLogin
                                    ? "Yes"
                                    : "No"}
                            </strong>
                        </div>

                        <div>
                            <span>Current Session</span>
                            <strong>
                                {user.currentSession
                                    ? "Yes"
                                    : "No"}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* LOGIN STATISTICS */}

                <section className="user-view-section">

                    <h3>
                        Login Statistics
                    </h3>

                    <div className="user-view-details">

                        <div>
                            <span>Login Attempts</span>
                            <strong>
                                {user.loginAttempts}
                            </strong>
                        </div>

                        <div>
                            <span>Successful Logins</span>
                            <strong>
                                {user.successfulLogins}
                            </strong>
                        </div>

                        <div>
                            <span>Failed Logins</span>
                            <strong>
                                {user.failedLogins}
                            </strong>
                        </div>

                        <div>
                            <span>Total Sessions</span>
                            <strong>
                                {user.totalSessions}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* SECURITY */}

                <section className="user-view-section">

                    <h3>
                        Security & Verification
                    </h3>

                    <div className="user-view-details">

                        <div>
                            <span>Email Verified</span>
                            <strong>
                                {user.emailVerified
                                    ? "Yes"
                                    : "No"}
                            </strong>
                        </div>

                        <div>
                            <span>Two Factor Authentication</span>
                            <strong>
                                {user.twoFactor
                                    ? "Enabled"
                                    : "Disabled"}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* ACCOUNT INFORMATION */}

                <section className="user-view-section">

                    <h3>
                        Account Information
                    </h3>

                    <div className="user-view-details">

                        <div>
                            <span>Account Created</span>
                            <strong>
                                {user.accountCreated}
                            </strong>
                        </div>

                        <div>
                            <span>Account Updated</span>
                            <strong>
                                {user.accountUpdated}
                            </strong>
                        </div>

                    </div>

                </section>

            </div>

        </div>
    );
}

export default UserView;