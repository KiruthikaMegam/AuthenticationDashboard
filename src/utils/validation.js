export function validateEmail(email) {

    if (!email) {
        return false;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


export function validatePhone(phone) {

    if (!phone) {
        return false;
    }

    const phonePattern =
        /^[0-9]{10}$/;

    return phonePattern.test(phone);
}


export function validateName(name) {

    if (!name) {
        return false;
    }

    return name.length >= 2;
}


export function validatePassword(password) {

    if (!password) {
        return false;
    }

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return passwordPattern.test(password);
}


export function passwordsMatch(
    password,
    confirmPassword
) {

    return (
        password === confirmPassword
    );
}