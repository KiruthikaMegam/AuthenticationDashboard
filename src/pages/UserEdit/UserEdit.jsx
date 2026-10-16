import React, { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import { useUsers } from "../../context/UsersContext";

import "./UserEdit.css";

function UserEdit() {

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        getUserById,
        updateUser
    } = useUsers();

    const user = getUserById(id);

    const [form, setForm] = useState(null);
    const [showPassword, setShowPassword] =
        useState(false);


    useEffect(() => {

        if (user) {
            setForm({
                ...user
            });
        }

    }, [user]);


    if (!user || !form) {

        return (
            <div className="user-edit-not-found">

                <h2>
                    User not found
                </h2>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/users")
                    }
                >
                    Back to Users
                </button>

            </div>
        );
    }


    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        updateUser(id, {
            ...form,
            loginAttempts:
                Number(form.loginAttempts),
            failedLogins:
                Number(form.failedLogins),
            successfulLogins:
                Number(form.successfulLogins),
            totalSessions:
                Number(form.totalSessions)
        });

        navigate(`/users/view/${id}`);
    };


    return (
        <div className="user-edit-page">

            <div className="user-edit-header">

                <div>

                    <p>
                        USER MANAGEMENT
                    </p>

                    <h1>
                        Edit User
                    </h1>

                    <span>
                        Update all account and
                        authentication details.
                    </span>

                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/users")
                    }
                >
                    ← Back to Users
                </button>

            </div>


            <form
                className="user-edit-card"
                onSubmit={handleSubmit}
            >

                <div className="edit-section">

                    <h2>
                        Basic Information
                    </h2>

                    <div className="edit-fields">

                        <div className="edit-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                name="name"
                                value={form.name || ""}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email || ""}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Phone
                            </label>

                            <input
                                name="phone"
                                value={form.phone || ""}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Password
                            </label>

                            <div className="edit-password">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={form.password || ""}
                                    onChange={handleChange}
                                />

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

                        </div>

                    </div>

                </div>


                <div className="edit-section">

                    <h2>
                        Account Details
                    </h2>

                    <div className="edit-fields">

                        <div className="edit-group">

                            <label>
                                Role
                            </label>

                            <select
                                name="role"
                                value={form.role || "User"}
                                onChange={handleChange}
                            >
                                <option>User</option>
                                <option>Moderator</option>
                                <option>Administrator</option>
                            </select>

                        </div>


                        <div className="edit-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={form.status || "Active"}
                                onChange={handleChange}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>

                        </div>


                        <div className="edit-group">

                            <label>
                                Account Type
                            </label>

                            <select
                                name="accountType"
                                value={
                                    form.accountType ||
                                    "Standard"
                                }
                                onChange={handleChange}
                            >
                                <option>Standard</option>
                                <option>Premium</option>
                                <option>Enterprise</option>
                            </select>

                        </div>


                        <div className="edit-group">

                            <label>
                                Location
                            </label>

                            <input
                                name="location"
                                value={form.location || ""}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Joined Date
                            </label>

                            <input
                                name="joined"
                                value={form.joined || ""}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Last Login
                            </label>

                            <input
                                name="lastLogin"
                                value={form.lastLogin || ""}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>


                <div className="edit-section">

                    <h2>
                        Authentication Details
                    </h2>

                    <div className="edit-fields">

                        <div className="edit-group">

                            <label>
                                Login Attempts
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="loginAttempts"
                                value={
                                    form.loginAttempts || 0
                                }
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Failed Logins
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="failedLogins"
                                value={
                                    form.failedLogins || 0
                                }
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Successful Logins
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="successfulLogins"
                                value={
                                    form.successfulLogins || 0
                                }
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Total Sessions
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="totalSessions"
                                value={
                                    form.totalSessions || 0
                                }
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    <div className="edit-checkboxes">

                        <label>

                            <input
                                type="checkbox"
                                name="activeLogin"
                                checked={
                                    Boolean(
                                        form.activeLogin
                                    )
                                }
                                onChange={handleChange}
                            />

                            Active Login

                        </label>


                        <label>

                            <input
                                type="checkbox"
                                name="currentSession"
                                checked={
                                    Boolean(
                                        form.currentSession
                                    )
                                }
                                onChange={handleChange}
                            />

                            Current Session

                        </label>


                        <label>

                            <input
                                type="checkbox"
                                name="emailVerified"
                                checked={
                                    Boolean(
                                        form.emailVerified
                                    )
                                }
                                onChange={handleChange}
                            />

                            Email Verified

                        </label>


                        <label>

                            <input
                                type="checkbox"
                                name="twoFactor"
                                checked={
                                    Boolean(
                                        form.twoFactor
                                    )
                                }
                                onChange={handleChange}
                            />

                            Two Factor

                        </label>

                    </div>

                </div>


                <div className="edit-section">

                    <h2>
                        Account Dates
                    </h2>

                    <div className="edit-fields">

                        <div className="edit-group">

                            <label>
                                Password Changed
                            </label>

                            <input
                                name="passwordChanged"
                                value={
                                    form.passwordChanged ||
                                    ""
                                }
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Account Created
                            </label>

                            <input
                                name="accountCreated"
                                value={
                                    form.accountCreated ||
                                    ""
                                }
                                onChange={handleChange}
                            />

                        </div>


                        <div className="edit-group">

                            <label>
                                Account Updated
                            </label>

                            <input
                                name="accountUpdated"
                                value={
                                    form.accountUpdated ||
                                    ""
                                }
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>


                <div className="edit-actions">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/users/view/${id}`
                            )
                        }
                    >
                        Cancel
                    </button>

                    <button type="submit">
                        Save Changes
                    </button>

                </div>

            </form>

        </div>
    );
}

export default UserEdit;