import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import Input from "../../components/Input/Input";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const {
        register,
        loading
    } = useAuth();

    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
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
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        };

        let valid = true;


        /* NAME */

        if (!formData.name) {

            newErrors.name =
                "Full name is required.";

            valid = false;

        } else if (
            formData.name.length < 3
        ) {

            newErrors.name =
                "Name must contain at least 3 characters.";

            valid = false;
        }


        /* EMAIL */

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


        /* PHONE */

        if (formData.phone) {

            const phonePattern =
                /^[0-9]{10}$/;

            if (
                !phonePattern.test(
                    formData.phone
                )
            ) {

                newErrors.phone =
                    "Phone number must contain 10 digits.";

                valid = false;
            }
        }


        /* PASSWORD */

        if (!formData.password) {

            newErrors.password =
                "Password is required.";

            valid = false;

        } else if (
            formData.password.length < 8
        ) {

            newErrors.password =
                "Password must contain at least 8 characters.";

            valid = false;

        } else if (
            !/[A-Z]/.test(
                formData.password
            )
        ) {

            newErrors.password =
                "Password must contain one uppercase letter.";

            valid = false;

        } else if (
            !/[a-z]/.test(
                formData.password
            )
        ) {

            newErrors.password =
                "Password must contain one lowercase letter.";

            valid = false;

        } else if (
            !/[0-9]/.test(
                formData.password
            )
        ) {

            newErrors.password =
                "Password must contain one number.";

            valid = false;

        } else if (
            !/[^A-Za-z0-9]/.test(
                formData.password
            )
        ) {

            newErrors.password =
                "Password must contain one special character.";

            valid = false;
        }


        /* CONFIRM PASSWORD */

        if (!formData.confirmPassword) {

            newErrors.confirmPassword =
                "Please confirm your password.";

            valid = false;

        } else if (
            formData.password !==
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

            await register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: "User",
            });

            showToast(
                "Account created successfully.",
                "success"
            );

            navigate("/login");

        } catch (error) {

            showToast(
                error?.message ||
                    "Unable to create your account.",
                "error"
            );
        }
    };


    if (loading) {

        return (
            <div className="register-loading">

                <Loader />

                <p>
                    Creating your account...
                </p>

            </div>
        );
    }


    return (
        <div className="register-page">

            <div className="register-card">

                {/* Logo */}

                <div className="register-logo">

                    <div className="register-logo-mark">
                        A
                    </div>

                    <span>
                        AuthDesk
                    </span>

                </div>


                {/* Header */}

                <div className="register-header">

                    <p className="register-label">
                        ACCOUNT CREATION
                    </p>

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Create your account to access
                        the authentication dashboard.
                    </p>

                </div>


                {/* Form */}

                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >

                    <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        error={errors.name}
                        required
                    />


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


                    <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter 10 digit phone number"
                        error={errors.phone}
                    />


                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        error={errors.password}
                        required
                    />


                    <PasswordInput
                        label="Confirm Password"
                        name="confirmPassword"
                        value={
                            formData.confirmPassword
                        }
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        error={
                            errors.confirmPassword
                        }
                        required
                    />


                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                    >
                        Create Account
                    </Button>

                </form>


                {/* Footer */}

                <div className="register-footer">

                    <span>
                        Already have an account?
                    </span>

                    <Link to="/login">
                        Sign In
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Register;