import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

import "./EditProfile.css";

function EditProfile() {
    const navigate = useNavigate();

    const {
        user,
        updateProfile,
        loading
    } = useAuth();

    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
    }, [user]);

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
            name: "",
            email: "",
            phone: "",
        };

        let valid = true;

        if (!formData.name) {
            newErrors.name = "Full name is required.";
            valid = false;
        } else if (formData.name.length < 3) {
            newErrors.name =
                "Name must contain at least 3 characters.";
            valid = false;
        }

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

        if (formData.phone) {
            const phonePattern = /^[0-9]{10}$/;

            if (!phonePattern.test(formData.phone)) {
                newErrors.phone =
                    "Phone number must contain 10 digits.";
                valid = false;
            }
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
            await updateProfile({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
            });

            showToast(
                "Profile updated successfully.",
                "success"
            );

            navigate("/profile");
        } catch (error) {
            showToast(
                "Unable to update your profile.",
                "error"
            );
        }
    };

    const handleCancel = () => {
        navigate("/profile");
    };

    if (loading) {
        return (
            <div className="edit-profile-loading">
                <Loader />

                <p>
                    Updating your profile...
                </p>
            </div>
        );
    }

    return (
        <div className="edit-profile-page">

            {/* Header */}

            <div className="edit-profile-header">

                <div>

                    <p className="edit-profile-label">
                        ACCOUNT SETTINGS
                    </p>

                    <h1>
                        Edit Profile
                    </h1>

                    <p>
                        Update your personal account
                        information.
                    </p>

                </div>

            </div>


            {/* Form Card */}

            <div className="edit-profile-card">

                <div className="edit-profile-card-header">

                    <div>

                        <h2>
                            Personal Information
                        </h2>

                        <p>
                            Keep your profile information
                            up to date.
                        </p>

                    </div>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="edit-profile-form">

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


                        <div className="edit-profile-readonly">

                            <div>

                                <span>
                                    Role
                                </span>

                                <strong>
                                    {user?.role || "User"}
                                </strong>

                            </div>

                            <p>
                                Your account role cannot be
                                changed from your profile.
                            </p>

                        </div>

                    </div>


                    {/* Buttons */}

                    <div className="edit-profile-actions">

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
                            Save Changes
                        </Button>

                    </div>

                </form>

            </div>


            {/* Security Notice */}

            <div className="edit-profile-security">

                <div className="edit-profile-security-icon">
                    ✓
                </div>

                <div>

                    <h3>
                        Profile Security
                    </h3>

                    <p>
                        Changing your email address may
                        require you to verify the new
                        email address.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default EditProfile;