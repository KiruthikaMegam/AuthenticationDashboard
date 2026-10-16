import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

import "./ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const {
        forgotPassword,
        loading
    } = useAuth();

    const { showToast } = useToast();

    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    const validateEmail = () => {
        if (!email) {
            setError("Email address is required.");
            return false;
        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setError("Enter a valid email address.");
            return false;
        }

        setError("");

        return true;
    };

    const handleChange = (event) => {
        setEmail(event.target.value);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail()) {
            showToast(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }

        try {
            await forgotPassword(email);

            localStorage.setItem(
                "resetEmail",
                email
            );

            showToast(
                "Password reset request created successfully.",
                "success"
            );

            navigate("/reset-password");
        } catch (error) {
            showToast(
                error?.message ||
                    "Unable to process your request.",
                "error"
            );
        }
    };

    if (loading) {
        return (
            <div className="forgot-password-loading">

                <Loader />

                <p>
                    Processing your request...
                </p>

            </div>
        );
    }

    return (
        <div className="forgot-password-page">

            <div className="forgot-password-card">

                {/* Icon */}

                <div className="forgot-password-icon">
                    🔐
                </div>


                {/* Header */}

                <div className="forgot-password-header">

                    <p className="forgot-password-label">
                        ACCOUNT RECOVERY
                    </p>

                    <h1>
                        Forgot Password?
                    </h1>

                    <p>
                        Enter your registered email address
                        and we'll help you reset your password.
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="forgot-password-form"
                >

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        error={error}
                        required
                    />


                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                    >
                        Continue
                    </Button>

                </form>


                {/* Back to Login */}

                <div className="forgot-password-footer">

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

export default ForgotPassword;