import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import Input from "../../components/Input/Input";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        login,
        loading
    } = useAuth();

    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {
            email: "",
            password: "",
        };

        let valid = true;

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

        if (!formData.password) {
            newErrors.password =
                "Password is required.";

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
            await login(
                formData.email,
                formData.password,
                formData.rememberMe
            );

            showToast(
                "Login successful. Welcome back!",
                "success"
            );

            const redirectPath =
                location.state?.from ||
                "/dashboard";

            navigate(
                redirectPath,
                {
                    replace: true
                }
            );

        } catch (error) {
            showToast(
                error?.message ||
                    "Invalid email or password.",
                "error"
            );
        }
    };

    if (loading) {
        return (
            <div className="login-loading">

                <Loader />

                <p>
                    Signing you in...
                </p>

            </div>
        );
    }

    return (
        <div className="login-page">

            <div className="login-card">

                {/* Logo */}

                <div className="login-logo">
                    <div className="login-logo-mark">
                        A
                    </div>

                    <span>
                        AuthDesk
                    </span>
                </div>


                {/* Header */}

                <div className="login-header">

                    <p className="login-label">
                        AUTHENTICATION
                    </p>

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Sign in to access your
                        account dashboard.
                    </p>

                </div>


                {/* Form */}

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="admin@example.com"
                        error={errors.email}
                        required
                    />


                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        error={errors.password}
                        required
                    />


                    <div className="login-options">

                        <Checkbox
                            label="Remember me"
                            name="rememberMe"
                            checked={
                                formData.rememberMe
                            }
                            onChange={handleChange}
                        />

                        <Link
                            to="/forgot-password"
                            className="login-forgot-link"
                        >
                            Forgot Password?
                        </Link>

                    </div>


                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                    >
                        Sign In
                    </Button>

                </form>


                {/* Demo Credentials */}

                <div className="login-demo">

                    <div className="login-demo-header">
                        Demo Credentials
                    </div>

                    <p>
                        Email:
                        <strong>
                            admin@example.com
                        </strong>
                    </p>

                    <p>
                        Password:
                        <strong>
                            Admin@123
                        </strong>
                    </p>

                </div>


                {/* Register */}

                <div className="login-register">

                    <span>
                        Don't have an account?
                    </span>

                    <Link to="/register">
                        Create Account
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;