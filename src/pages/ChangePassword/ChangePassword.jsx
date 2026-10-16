import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

import "./ChangePassword.css";

function ChangePassword() {
    const navigate = useNavigate();

    const {
        changePassword,
        loading
    } = useAuth();

    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        };

        let valid = true;

        if (!formData.currentPassword) {
            newErrors.currentPassword =
                "Current password is required.";

            valid = false;
        }

        if (!formData.newPassword) {
            newErrors.newPassword =
                "New password is required.";

            valid = false;
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword =
                "Password must contain at least 8 characters.";

            valid = false;
        } else if (
            !/[A-Z]/.test(formData.newPassword)
        ) {
            newErrors.newPassword =
                "Password must contain at least one uppercase letter.";

            valid = false;
        } else if (
            !/[a-z]/.test(formData.newPassword)
        ) {
            newErrors.newPassword =
                "Password must contain at least one lowercase letter.";

            valid = false;
        } else if (
            !/[0-9]/.test(formData.newPassword)
        ) {
            newErrors.newPassword =
                "Password must contain at least one number.";

            valid = false;
        } else if (
            !/[^A-Za-z0-9]/.test(formData.newPassword)
        ) {
            newErrors.newPassword =
                "Password must contain at least one special character.";

            valid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your new password.";

            valid = false;
        } else if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match.";

            valid = false;
        }

        if (
            formData.currentPassword &&
            formData.newPassword &&
            formData.currentPassword ===
                formData.newPassword
        ) {
            newErrors.newPassword =
                "New password must be different from current password.";

            valid = false;
        }

        setErrors(newErrors);

        return valid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            showToast(
                "Please correct the highlighted fields.",
                "error"
            );

            return;
        }

        try {
            await changePassword(
                formData.currentPassword,
                formData.newPassword
            );

            showToast(
                "Password changed successfully.",
                "success"
            );

            setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            navigate("/profile");
        } catch (error) {
            showToast(
                error?.message ||
                    "Unable to change your password.",
                "error"
            );
        }
    };

    const handleCancel = () => {
        navigate("/profile");
    };

    if (loading) {
        return (
            <div className="change-password-loading">
                <Loader />

                <p>
                    Updating your password...
                </p>
            </div>
        );
    }

    return (
        <div className="change-password-page">

            {/* Header */}

            <div className="change-password-header">

                <div>

                    <p className="change-password-label">
                        ACCOUNT SECURITY
                    </p>

                    <h1>
                        Change Password
                    </h1>

                    <p>
                        Update your password to keep
                        your account secure.
                    </p>

                </div>

            </div>


            {/* Main Card */}

            <div className="change-password-card">

                <div className="change-password-card-header">

                    <div className="change-password-icon">
                        🔒
                    </div>

                    <div>

                        <h2>
                            Update Password
                        </h2>

                        <p>
                            Enter your current password
                            and choose a new secure password.
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="change-password-form">

                        <PasswordInput
                            label="Current Password"
                            name="currentPassword"
                            value={
                                formData.currentPassword
                            }
                            onChange={handleChange}
                            placeholder="Enter current password"
                            error={
                                errors.currentPassword
                            }
                            required
                        />


                        <PasswordInput
                            label="New Password"
                            name="newPassword"
                            value={
                                formData.newPassword
                            }
                            onChange={handleChange}
                            placeholder="Enter new password"
                            error={
                                errors.newPassword
                            }
                            required
                        />


                        <PasswordInput
                            label="Confirm New Password"
                            name="confirmPassword"
                            value={
                                formData.confirmPassword
                            }
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            error={
                                errors.confirmPassword
                            }
                            required
                        />

                    </div>


                    {/* Password Requirements */}

                    <div className="password-requirements">

                        <h3>
                            Password Requirements
                        </h3>

                        <p>
                            Your new password should contain:
                        </p>

                        <ul>

                            <li>
                                At least 8 characters
                            </li>

                            <li>
                                At least one uppercase letter
                            </li>

                            <li>
                                At least one lowercase letter
                            </li>

                            <li>
                                At least one number
                            </li>

                            <li>
                                At least one special character
                            </li>

                        </ul>

                    </div>


                    {/* Actions */}

                    <div className="change-password-actions">

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                        >
                            Change Password
                        </Button>

                    </div>

                </form>

            </div>


            {/* Security Notice */}

            <div className="change-password-security">

                <div className="change-password-security-icon">
                    ✓
                </div>

                <div>

                    <h3>
                        Keep Your Account Secure
                    </h3>

                    <p>
                        Never share your password with
                        anyone. Use a unique password that
                        you do not use on other websites.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default ChangePassword;