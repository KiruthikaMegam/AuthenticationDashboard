import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Button from "../../components/Button/Button";

import "./Profile.css";

function Profile() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const profile = user || {
        name: "Administrator",
        email: "admin@example.com",
        role: "Administrator",
        phone: "",
    };

    const getInitials = () => {
        if (!profile.name) {
            return "A";
        }

        const nameParts = profile.name.split(" ");

        if (nameParts.length >= 2) {
            return (
                nameParts[0].charAt(0) +
                nameParts[1].charAt(0)
            ).toUpperCase();
        }

        return profile.name.charAt(0).toUpperCase();
    };

    return (
        <div className="profile-page">

            {/* Page Header */}
            <div className="profile-page-header">
                <div>
                    <p className="profile-page-label">
                        ACCOUNT
                    </p>

                    <h1>My Profile</h1>

                    <p>
                        View your account information and
                        profile details.
                    </p>
                </div>

                <Button
                    variant="primary"
                    onClick={() => navigate("/profile/edit")}
                >
                    Edit Profile
                </Button>
            </div>


            {/* Profile Overview */}
            <section className="profile-overview">

                <div className="profile-avatar">
                    {getInitials()}
                </div>

                <div className="profile-main-info">
                    <h2>
                        {profile.name || "Administrator"}
                    </h2>

                    <p>
                        {profile.email || "admin@example.com"}
                    </p>

                    <span className="profile-role">
                        {profile.role || "Administrator"}
                    </span>
                </div>

            </section>


            {/* Information */}
            <section className="profile-content">

                <div className="profile-card">

                    <div className="profile-card-header">
                        <div>
                            <h2>Personal Information</h2>

                            <p>
                                Your basic account information.
                            </p>
                        </div>
                    </div>


                    <div className="profile-details">

                        <div className="profile-detail-item">
                            <span className="profile-detail-label">
                                Full Name
                            </span>

                            <strong>
                                {profile.name || "Not provided"}
                            </strong>
                        </div>


                        <div className="profile-detail-item">
                            <span className="profile-detail-label">
                                Email Address
                            </span>

                            <strong>
                                {profile.email || "Not provided"}
                            </strong>
                        </div>


                        <div className="profile-detail-item">
                            <span className="profile-detail-label">
                                Phone Number
                            </span>

                            <strong>
                                {profile.phone || "Not provided"}
                            </strong>
                        </div>


                        <div className="profile-detail-item">
                            <span className="profile-detail-label">
                                Role
                            </span>

                            <strong>
                                {profile.role || "User"}
                            </strong>
                        </div>

                    </div>

                </div>


                {/* Account Security */}
                <div className="profile-card">

                    <div className="profile-card-header">
                        <div>
                            <h2>Account Security</h2>

                            <p>
                                Manage your password and account
                                security.
                            </p>
                        </div>
                    </div>


                    <div className="security-items">

                        <div className="security-item">

                            <div className="security-item-icon">
                                🔒
                            </div>

                            <div className="security-item-content">
                                <h3>Password</h3>

                                <p>
                                    Keep your password updated
                                    regularly.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="security-action"
                                onClick={() =>
                                    navigate("/change-password")
                                }
                            >
                                Change
                            </button>

                        </div>


                        <div className="security-item">

                            <div className="security-item-icon">
                                ✓
                            </div>

                            <div className="security-item-content">
                                <h3>Account Status</h3>

                                <p>
                                    Your account is active and
                                    protected.
                                </p>
                            </div>

                            <span className="account-active">
                                Active
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* Account Information */}
            <section className="profile-card account-card">

                <div className="profile-card-header">
                    <div>
                        <h2>Account Information</h2>

                        <p>
                            Additional information about your
                            account.
                        </p>
                    </div>
                </div>


                <div className="account-information">

                    <div>
                        <span>Account Type</span>
                        <strong>Standard Account</strong>
                    </div>

                    <div>
                        <span>Access Level</span>
                        <strong>
                            {profile.role || "User"}
                        </strong>
                    </div>

                    <div>
                        <span>Authentication</span>
                        <strong>Secure</strong>
                    </div>

                    <div>
                        <span>Two-Factor Authentication</span>
                        <strong className="two-factor-disabled">
                            Not Enabled
                        </strong>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Profile;