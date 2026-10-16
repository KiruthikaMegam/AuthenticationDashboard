import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../../context/UsersContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import EmptyState from "../../components/EmptyState/EmptyState";

import "./Users.css";

function Users() {

    const navigate = useNavigate();

    const {
        users,
        deleteUser
    } = useUsers();

    const [search, setSearch] = useState("");
    const [deleteTarget, setDeleteTarget] =
        useState(null);


    /* =========================
       SEARCH
    ========================= */

    const normalizedSearch =
        String(search || "").toLowerCase();


    const filteredUsers = users.filter((user) => {

        const name =
            String(user.name || "").toLowerCase();

        const email =
            String(user.email || "").toLowerCase();

        const role =
            String(user.role || "").toLowerCase();

        const location =
            String(user.location || "").toLowerCase();

        return (
            name.includes(normalizedSearch) ||
            email.includes(normalizedSearch) ||
            role.includes(normalizedSearch) ||
            location.includes(normalizedSearch)
        );
    });


    /* =========================
       DELETE
    ========================= */

    const handleDelete = () => {

        if (!deleteTarget) {
            return;
        }

        deleteUser(deleteTarget.id);

        setDeleteTarget(null);
    };


    return (
        <div className="users-page">

            {/* =========================
                HEADER
            ========================= */}

            <section className="users-page-header">

                <div>

                    <p className="users-small-title">
                        USER MANAGEMENT
                    </p>

                    <h1>
                        Users
                    </h1>

                    <p>
                        Manage registered users,
                        authentication activity and
                        account information.
                    </p>

                </div>


                <button
                    type="button"
                    className="users-add-button"
                    onClick={() =>
                        navigate("/users/add")
                    }
                >

                    <span>+</span>

                    Add User

                </button>

            </section>


            {/* =========================
                SUMMARY
            ========================= */}

            <section className="users-summary">

                <div className="users-summary-card">

                    <span>Total Users</span>

                    <strong>
                        {users.length}
                    </strong>

                </div>


                <div className="users-summary-card">

                    <span>Active Users</span>

                    <strong>
                        {
                            users.filter(
                                (item) =>
                                    item.status === "Active"
                            ).length
                        }
                    </strong>

                </div>


                <div className="users-summary-card">

                    <span>Active Logins</span>

                    <strong>
                        {
                            users.filter(
                                (item) =>
                                    item.activeLogin === true
                            ).length
                        }
                    </strong>

                </div>


                <div className="users-summary-card">

                    <span>Failed Logins</span>

                    <strong>
                        {
                            users.reduce(
                                (total, item) =>
                                    total +
                                    Number(
                                        item.failedLogins || 0
                                    ),
                                0
                            )
                        }
                    </strong>

                </div>

            </section>


            {/* =========================
                SEARCH
            ========================= */}

            <section className="users-toolbar">

                <div className="users-search">

                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search users by name, email, role or location..."
                    />

                </div>

                <div className="users-result-count">

                    Showing{" "}
                    <strong>
                        {filteredUsers.length}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {users.length}
                    </strong>{" "}
                    users

                </div>

            </section>


            {/* =========================
                USERS
            ========================= */}

            {filteredUsers.length === 0 ? (

                <div className="users-empty">

                    <EmptyState
                        title="No users found"
                        message="No users match your search."
                    />

                </div>

            ) : (

                <section className="users-card-list">

                    {filteredUsers.map((user) => (

                        <article
                            className="user-card"
                            key={user.id}
                        >

                            {/* TOP */}

                            <div className="user-card-top">

                                <div className="user-card-identity">

                                    <div className="user-avatar">

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

                                    </div>

                                </div>


                                <span
                                    className={
                                        user.status === "Active"
                                            ? "user-badge active"
                                            : "user-badge inactive"
                                    }
                                >
                                    {user.status}
                                </span>

                            </div>


                            {/* ROLE */}

                            <div className="user-card-role-row">

                                <span className="user-role">
                                    {user.role}
                                </span>

                                <span className="user-account-type">
                                    {user.accountType}
                                </span>

                            </div>


                            {/* DETAILS */}

                            <div className="user-card-details">

                                <div className="user-detail">

                                    <span>
                                        Phone
                                    </span>

                                    <strong>
                                        {user.phone}
                                    </strong>

                                </div>


                                <div className="user-detail">

                                    <span>
                                        Location
                                    </span>

                                    <strong>
                                        {user.location}
                                    </strong>

                                </div>


                                <div className="user-detail">

                                    <span>
                                        Active Login
                                    </span>

                                    <strong
                                        className={
                                            user.activeLogin
                                                ? "text-success"
                                                : "text-muted"
                                        }
                                    >
                                        {user.activeLogin
                                            ? "Yes"
                                            : "No"}
                                    </strong>

                                </div>


                                <div className="user-detail">

                                    <span>
                                        Login Attempts
                                    </span>

                                    <strong>
                                        {user.loginAttempts}
                                    </strong>

                                </div>


                                <div className="user-detail">

                                    <span>
                                        Failed Logins
                                    </span>

                                    <strong className="text-danger">
                                        {user.failedLogins}
                                    </strong>

                                </div>


                                <div className="user-detail">

                                    <span>
                                        Successful
                                    </span>

                                    <strong className="text-success">
                                        {user.successfulLogins}
                                    </strong>

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div className="user-password-row">

                                <div>

                                    <span>
                                        Password
                                    </span>

                                    <strong>
                                        ••••••••
                                    </strong>

                                </div>

                                <span className="password-note">
                                    Protected
                                </span>

                            </div>


                            {/* LAST LOGIN */}

                            <div className="user-last-login">

                                <span>
                                    Last Login
                                </span>

                                <strong>
                                    {user.lastLogin}
                                </strong>

                            </div>


                            {/* ACTIONS */}

                            <div className="user-card-actions">

                                <button
                                    type="button"
                                    className="user-action view"
                                    onClick={() =>
                                        navigate(
                                            `/users/view/${user.id}`
                                        )
                                    }
                                >
                                    View
                                </button>


                                <button
                                    type="button"
                                    className="user-action edit"
                                    onClick={() =>
                                        navigate(
                                            `/users/edit/${user.id}`
                                        )
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    className="user-action delete"
                                    onClick={() =>
                                        setDeleteTarget(user)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </article>

                    ))}

                </section>

            )}


            {/* DELETE MODAL */}

            <ConfirmModal
                isOpen={Boolean(deleteTarget)}
                title="Delete User"
                message={
                    deleteTarget
                        ? `Are you sure you want to delete ${deleteTarget.name}?`
                        : ""
                }
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                onConfirm={handleDelete}
                onCancel={() =>
                    setDeleteTarget(null)
                }
            />

        </div>
    );
}

export default Users;