export function isValidSession() {

    const authUser =
        localStorage.getItem("authUser");

    const authToken =
        localStorage.getItem("authToken");

    return Boolean(
        authUser &&
        authToken
    );
}


export function getCurrentUser() {

    const user =
        localStorage.getItem("authUser");

    if (!user) {
        return null;
    }

    try {

        return JSON.parse(user);

    } catch {

        return null;
    }
}


export function clearAuthSession() {

    localStorage.removeItem(
        "authUser"
    );

    localStorage.removeItem(
        "authToken"
    );

    localStorage.removeItem(
        "rememberMe"
    );
}