import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import Input from "../../components/Input/Input";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

import "./ResetPassword.css";

function ResetPassword() {
    const navigate = useNavigate();

    const {
        resetPassword,
        loading
    } = useAuth();

    const { showToast } = useToast();

    const savedEmail =
        localStorage.getItem("resetEmail") || "";

    const [formData, setFormData] = useState({
        email: savedEmail,
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

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
            email: "",
            newPassword: "",
            confirmPassword: "",
        };

        let valid = true;


        /*
         * EMAIL
         */

        if (!formData.email) {

            newErrors.email =
                "Email address is required.";

            valid = false;

        } else {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(formData.email)) {

                newErrors.email =
                    "Enter a valid email address.";

                valid = false;
            }
        }


        /*
         * NEW PASSWORD
         */

        if (!formData.newPassword) {

            newErrors.newPassword =
                "New password is required.";

            valid = false;

        } else if (
            formData.newPassword.length < 8
        ) {

            newErrors.newPassword =
                "Password must contain at least 8 characters.";

            valid = false;

        } else if (
            !/[A-Z]/.test(
                formData.newPassword
            )
        ) {

            newErrors.newPassword =
                "Password must contain at least one uppercase letter.";

            valid = false;

        } else if (
            !/[a-z]/.test(
                formData.newPassword
            )
        ) {

            newErrors.newPassword =
                "Password must contain at least one lowercase letter.";

            valid = false;

        } else if (
            !/[0-9]/.test(
                formData.newPassword
            )
        ) {

            newErrors.newPassword =
                "Password must contain at least one number.";

            valid = false;

        } else if (
            !/[^A-Za-z0-9]/.test(
                formData.newPassword
            )
        ) {

            newErrors.newPassword =
                "Password must contain at least one special character.";

            valid = false;
        }


        /*
         * CONFIRM PASSWORD
         */

        if (!formData.confirmPassword) {

            newErrors.confirmPassword =
                "Please confirm your password.";

            valid = false;

        } else if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            newErrors.confirmPassword =
                "Passwords do not match.";

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

            await resetPassword(
                formData.email,
                formData.newPassword
            );

            localStorage.removeItem(
                "resetEmail"
            );

            showToast(
                "Password reset successfully.",
                "success"
            );

            navigate("/login");

        } catch (error) {

            showToast(
                error?.message ||
                    "Unable to reset your password.",
                "error"
            );
        }
    };


    if (loading) {

        return (
            <div className="reset-password-loading">

                <Loader />

                <p>
                    Resetting your password...
                </p>

            </div>
        );
    }


    return (
        <div className="reset-password-page">

            <div className="reset-password-card">

                {/* Icon */}

                <div className="reset-password-icon">
                    🔑
                </div>


                {/* Header */}

                <div className="reset-password-header">

                    <p className="reset-password-label">
                        PASSWORD RECOVERY
                    </p>

                    <h1>
                        Reset Password
                    </h1>

                    <p>
                        Create a new secure password
                        for your account.
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="reset-password-form"
                >

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        error={errors.email}
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


                    {/* Password Rules */}

                    <div className="reset-password-rules">

                        <h3>
                            Password Requirements
                        </h3>

                        <ul>

                            <li>
                                At least 8 characters
                            </li>

                            <li>
                                One uppercase letter
                            </li>

                            <li>
                                One lowercase letter
                            </li>

                            <li>
                                One number
                            </li>

                            <li>
                                One special character
                            </li>

                        </ul>

                    </div>


                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                    >
                        Reset Password
                    </Button>

                </form>


                {/* Footer */}

                <div className="reset-password-footer">

                    <span>
                        Remember your password?
                    </span>

                    <Link to="/login">
                        Back to Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;