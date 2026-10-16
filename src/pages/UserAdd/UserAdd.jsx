import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../../context/UsersContext";

import "./UserAdd.css";

const initialForm = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "User",
    status: "Active",
    activeLogin: false,
    loginAttempts: 0,
    failedLogins: 0,
    successfulLogins: 0,
    lastLogin: "Never",
    joined: "",
    location: "",
    accountType: "Standard",
    emailVerified: false,
    twoFactor: false,
    totalSessions: 0,
    currentSession: false,
    passwordChanged: "",
    accountCreated: "",
    accountUpdated: ""
};


function UserAdd() {

    const navigate = useNavigate();

    const { addUser } = useUsers();

    const [form, setForm] =
        useState(initialForm);

    const [showPassword, setShowPassword] =
        useState(false);

    const [errors, setErrors] =
        useState({});


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


    const validate = () => {

        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name =
                "Name is required.";
        }

        if (!form.email.trim()) {
            nextErrors.email =
                "Email is required.";
        }

        if (!form.password.trim()) {
            nextErrors.password =
                "Password is required.";
        }

        if (!form.phone.trim()) {
            nextErrors.phone =
                "Phone is required.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        if (!validate()) {
            return;
        }

        addUser({
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

        navigate("/users");
    };


    return (
        <div className="user-form-page">

            <div className="user-form-header">

                <div>

                    <p>
                        USER MANAGEMENT
                    </p>

                    <h1>
                        Add User
                    </h1>

                    <span>
                        Create a new user account.
                    </span>

                </div>

                <button
                    type="button"
                    className="back-button"
                    onClick={() =>
                        navigate("/users")
                    }
                >
                    ← Back to Users
                </button>

            </div>


            <form
                className="user-form-card"
                onSubmit={handleSubmit}
            >

                <div className="form-section">

                    <h2>
                        Basic Information
                    </h2>

                    <div className="form-fields">

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />

                            {errors.name && (
                                <small>
                                    {errors.name}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                            />

                            {errors.email && (
                                <small>
                                    {errors.email}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Phone
                            </label>

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+91 XXXXX XXXXX"
                            />

                            {errors.phone && (
                                <small>
                                    {errors.phone}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Password
                            </label>

                            <div className="password-field">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
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

                            {errors.password && (
                                <small>
                                    {errors.password}
                                </small>
                            )}

                        </div>

                    </div>

                </div>


                <div className="form-section">

                    <h2>
                        Account Information
                    </h2>

                    <div className="form-fields">

                        <div className="form-group">

                            <label>
                                Role
                            </label>

                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                            >
                                <option>User</option>
                                <option>Moderator</option>
                                <option>Administrator</option>
                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Account Type
                            </label>

                            <select
                                name="accountType"
                                value={form.accountType}
                                onChange={handleChange}
                            >
                                <option>Standard</option>
                                <option>Premium</option>
                                <option>Enterprise</option>
                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Location
                            </label>

                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="Chennai, India"
                            />

                        </div>

                    </div>

                </div>


                <div className="form-section">

                    <h2>
                        Login & Security
                    </h2>

                    <div className="form-fields">

                        <div className="form-group">

                            <label>
                                Login Attempts
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="loginAttempts"
                                value={form.loginAttempts}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Failed Logins
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="failedLogins"
                                value={form.failedLogins}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Successful Logins
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="successfulLogins"
                                value={form.successfulLogins}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Total Sessions
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="totalSessions"
                                value={form.totalSessions}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    <div className="checkbox-row">

                        <label>
                            <input
                                type="checkbox"
                                name="activeLogin"
                                checked={form.activeLogin}
                                onChange={handleChange}
                            />

                            Active Login
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                name="emailVerified"
                                checked={form.emailVerified}
                                onChange={handleChange}
                            />

                            Email Verified
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                name="twoFactor"
                                checked={form.twoFactor}
                                onChange={handleChange}
                            />

                            Two Factor Enabled
                        </label>

                    </div>

                </div>


                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() =>
                            navigate("/users")
                        }
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-button"
                    >
                        Create User
                    </button>

                </div>

            </form>

        </div>
    );
}

export default UserAdd;