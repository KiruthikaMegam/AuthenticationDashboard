import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext(null);

/* =========================
   DEFAULT ADMIN USER
========================= */

const DEFAULT_USER = {
    id: 1,
    name: "Administrator",
    email: "admin@example.com",
    phone: "9876543210",
    role: "Administrator"
};

const DEFAULT_ADMIN_PASSWORD = "Admin@123";

/* =========================
   AUTH PROVIDER
========================= */

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    /* =========================
       RESTORE SESSION
    ========================= */

    useEffect(() => {

        const storedUser =
            localStorage.getItem("authUser");

        const sessionUser =
            sessionStorage.getItem("authUser");

        if (storedUser) {

            try {

                const parsedUser =
                    JSON.parse(storedUser);

                setUser(parsedUser);

            } catch (error) {

                localStorage.removeItem(
                    "authUser"
                );

            }

        } else if (sessionUser) {

            try {

                const parsedUser =
                    JSON.parse(sessionUser);

                setUser(parsedUser);

            } catch (error) {

                sessionStorage.removeItem(
                    "authUser"
                );

            }

        }

        setLoading(false);

    }, []);


    /* =========================
       LOGIN
    ========================= */

    const login = async (
        email,
        password,
        rememberMe
    ) => {

        setLoading(true);

        return new Promise(
            (resolve, reject) => {

                setTimeout(() => {

                    const cleanEmail =
                        email.toLowerCase();

                    let loggedInUser = null;


                    /* =========================
                       ADMIN LOGIN
                    ========================= */

                    if (
                        cleanEmail ===
                            "admin@example.com"
                    ) {

                        const savedAdminPassword =
                            localStorage.getItem(
                                "adminPassword"
                            ) ||
                            DEFAULT_ADMIN_PASSWORD;

                        if (
                            password ===
                            savedAdminPassword
                        ) {

                            loggedInUser = {
                                ...DEFAULT_USER
                            };

                        }

                    }


                    /* =========================
                       REGISTERED USER LOGIN
                    ========================= */

                    if (!loggedInUser) {

                        const registeredUsers =
                            JSON.parse(
                                localStorage.getItem(
                                    "registeredUsers"
                                ) || "[]"
                            );

                        for (
                            const registeredUser
                            of registeredUsers
                        ) {

                            if (
                                registeredUser.email
                                    .toLowerCase() ===
                                    cleanEmail &&
                                registeredUser.password ===
                                    password
                            ) {

                                loggedInUser = {
                                    ...registeredUser
                                };

                                break;
                            }
                        }
                    }


                    /* =========================
                       INVALID LOGIN
                    ========================= */

                    if (!loggedInUser) {

                        setLoading(false);

                        reject(
                            new Error(
                                "Invalid email or password."
                            )
                        );

                        return;
                    }


                    /*
                     * Do not store password
                     * inside authUser.
                     */

                    delete loggedInUser.password;


                    /* =========================
                       CLEAR OLD SESSION
                    ========================= */

                    localStorage.removeItem(
                        "authUser"
                    );

                    sessionStorage.removeItem(
                        "authUser"
                    );


                    /* =========================
                       REMEMBER ME
                    ========================= */

                    if (rememberMe) {

                        localStorage.setItem(
                            "authUser",
                            JSON.stringify(
                                loggedInUser
                            )
                        );

                        localStorage.setItem(
                            "rememberMe",
                            "true"
                        );

                    } else {

                        sessionStorage.setItem(
                            "authUser",
                            JSON.stringify(
                                loggedInUser
                            )
                        );

                        localStorage.removeItem(
                            "rememberMe"
                        );
                    }


                    setUser(loggedInUser);

                    setLoading(false);

                    resolve(loggedInUser);

                }, 700);

            }
        );
    };


    /* =========================
       REGISTER
    ========================= */

    const register = async (userData) => {

        setLoading(true);

        return new Promise(
            (resolve, reject) => {

                setTimeout(() => {

                    const registeredUsers =
                        JSON.parse(
                            localStorage.getItem(
                                "registeredUsers"
                            ) || "[]"
                        );


                    /* =========================
                       CHECK DUPLICATE EMAIL
                    ========================= */

                    if (
                        userData.email.toLowerCase() ===
                        "admin@example.com"
                    ) {

                        setLoading(false);

                        reject(
                            new Error(
                                "This email address is already registered."
                            )
                        );

                        return;
                    }


                    for (
                        const registeredUser
                        of registeredUsers
                    ) {

                        if (
                            registeredUser.email
                                .toLowerCase() ===
                            userData.email.toLowerCase()
                        ) {

                            setLoading(false);

                            reject(
                                new Error(
                                    "An account with this email already exists."
                                )
                            );

                            return;
                        }
                    }


                    /* =========================
                       CREATE USER
                    ========================= */

                    const newUser = {

                        id:
                            Date.now(),

                        name:
                            userData.name,

                        email:
                            userData.email,

                        phone:
                            userData.phone || "",

                        password:
                            userData.password,

                        role:
                            userData.role || "User"
                    };


                    registeredUsers.push(
                        newUser
                    );


                    localStorage.setItem(
                        "registeredUsers",
                        JSON.stringify(
                            registeredUsers
                        )
                    );


                    setLoading(false);

                    resolve(newUser);

                }, 700);

            }
        );
    };


    /* =========================
       LOGOUT
    ========================= */

    const logout = async () => {

        setLoading(true);

        return new Promise(
            (resolve) => {

                setTimeout(() => {

                    localStorage.removeItem(
                        "authUser"
                    );

                    localStorage.removeItem(
                        "authToken"
                    );

                    localStorage.removeItem(
                        "rememberMe"
                    );

                    sessionStorage.removeItem(
                        "authUser"
                    );

                    sessionStorage.removeItem(
                        "authToken"
                    );

                    setUser(null);

                    setLoading(false);

                    resolve();

                }, 500);

            }
        );
    };


    /* =========================
       UPDATE PROFILE
    ========================= */

    const updateProfile = async (
        updatedData
    ) => {

        setLoading(true);

        return new Promise(
            (resolve) => {

                setTimeout(() => {

                    const updatedUser = {
                        ...user,
                        ...updatedData
                    };


                    setUser(
                        updatedUser
                    );


                    /*
                     * Update wherever
                     * current session exists.
                     */

                    const localUser =
                        localStorage.getItem(
                            "authUser"
                        );

                    const sessionUser =
                        sessionStorage.getItem(
                            "authUser"
                        );


                    if (localUser) {

                        localStorage.setItem(
                            "authUser",
                            JSON.stringify(
                                updatedUser
                            )
                        );

                    }


                    if (sessionUser) {

                        sessionStorage.setItem(
                            "authUser",
                            JSON.stringify(
                                updatedUser
                            )
                        );

                    }


                    /*
                     * Also update
                     * registered user.
                     */

                    const registeredUsers =
                        JSON.parse(
                            localStorage.getItem(
                                "registeredUsers"
                            ) || "[]"
                        );

                    const updatedUsers = [];


                    for (
                        const registeredUser
                        of registeredUsers
                    ) {

                        if (
                            user &&
                            registeredUser.id ===
                                user.id
                        ) {

                            updatedUsers.push({
                                ...registeredUser,
                                ...updatedData
                            });

                        } else {

                            updatedUsers.push(
                                registeredUser
                            );
                        }
                    }


                    localStorage.setItem(
                        "registeredUsers",
                        JSON.stringify(
                            updatedUsers
                        )
                    );


                    setLoading(false);

                    resolve(
                        updatedUser
                    );

                }, 700);

            }
        );
    };


    /* =========================
       CHANGE PASSWORD
    ========================= */

    const changePassword = async (
        currentPassword,
        newPassword
    ) => {

        setLoading(true);

        return new Promise(
            (resolve, reject) => {

                setTimeout(() => {

                    if (!user) {

                        setLoading(false);

                        reject(
                            new Error(
                                "You are not logged in."
                            )
                        );

                        return;
                    }


                    /* =========================
                       ADMIN PASSWORD
                    ========================= */

                    if (
                        user.email ===
                        "admin@example.com"
                    ) {

                        const savedPassword =
                            localStorage.getItem(
                                "adminPassword"
                            ) ||
                            DEFAULT_ADMIN_PASSWORD;


                        if (
                            currentPassword !==
                            savedPassword
                        ) {

                            setLoading(false);

                            reject(
                                new Error(
                                    "Current password is incorrect."
                                )
                            );

                            return;
                        }


                        localStorage.setItem(
                            "adminPassword",
                            newPassword
                        );


                        setLoading(false);

                        resolve();

                        return;
                    }


                    /* =========================
                       REGISTERED USER PASSWORD
                    ========================= */

                    const registeredUsers =
                        JSON.parse(
                            localStorage.getItem(
                                "registeredUsers"
                            ) || "[]"
                        );


                    let passwordChanged =
                        false;

                    const updatedUsers = [];


                    for (
                        const registeredUser
                        of registeredUsers
                    ) {

                        if (
                            registeredUser.id ===
                            user.id
                        ) {

                            if (
                                registeredUser.password !==
                                currentPassword
                            ) {

                                setLoading(false);

                                reject(
                                    new Error(
                                        "Current password is incorrect."
                                    )
                                );

                                return;
                            }


                            updatedUsers.push({
                                ...registeredUser,
                                password:
                                    newPassword
                            });

                            passwordChanged =
                                true;

                        } else {

                            updatedUsers.push(
                                registeredUser
                            );
                        }
                    }


                    if (!passwordChanged) {

                        setLoading(false);

                        reject(
                            new Error(
                                "Unable to change password."
                            )
                        );

                        return;
                    }


                    localStorage.setItem(
                        "registeredUsers",
                        JSON.stringify(
                            updatedUsers
                        )
                    );


                    setLoading(false);

                    resolve();

                }, 700);

            }
        );
    };


    /* =========================
       FORGOT PASSWORD
    ========================= */

    const forgotPassword = async (
        email
    ) => {

        setLoading(true);

        return new Promise(
            (resolve, reject) => {

                setTimeout(() => {

                    const cleanEmail =
                        email.toLowerCase();


                    let userExists = false;


                    /* =========================
                       ADMIN
                    ========================= */

                    if (
                        cleanEmail ===
                        "admin@example.com"
                    ) {

                        userExists = true;
                    }


                    /* =========================
                       REGISTERED USERS
                    ========================= */

                    if (!userExists) {

                        const registeredUsers =
                            JSON.parse(
                                localStorage.getItem(
                                    "registeredUsers"
                                ) || "[]"
                            );


                        for (
                            const registeredUser
                            of registeredUsers
                        ) {

                            if (
                                registeredUser.email
                                    .toLowerCase() ===
                                cleanEmail
                            ) {

                                userExists = true;

                                break;
                            }
                        }
                    }


                    if (!userExists) {

                        setLoading(false);

                        reject(
                            new Error(
                                "No account was found with this email address."
                            )
                        );

                        return;
                    }


                    localStorage.setItem(
                        "resetEmail",
                        email
                    );


                    setLoading(false);

                    resolve();

                }, 700);

            }
        );
    };


    /* =========================
       RESET PASSWORD
    ========================= */

    const resetPassword = async (
        email,
        newPassword
    ) => {

        setLoading(true);

        return new Promise(
            (resolve, reject) => {

                setTimeout(() => {

                    const cleanEmail =
                        email.toLowerCase();


                    /* =========================
                       ADMIN RESET
                    ========================= */

                    if (
                        cleanEmail ===
                        "admin@example.com"
                    ) {

                        localStorage.setItem(
                            "adminPassword",
                            newPassword
                        );

                        setLoading(false);

                        resolve();

                        return;
                    }


                    /* =========================
                       REGISTERED USER RESET
                    ========================= */

                    const registeredUsers =
                        JSON.parse(
                            localStorage.getItem(
                                "registeredUsers"
                            ) || "[]"
                        );


                    let userFound = false;

                    const updatedUsers = [];


                    for (
                        const registeredUser
                        of registeredUsers
                    ) {

                        if (
                            registeredUser.email
                                .toLowerCase() ===
                            cleanEmail
                        ) {

                            updatedUsers.push({
                                ...registeredUser,
                                password:
                                    newPassword
                            });

                            userFound = true;

                        } else {

                            updatedUsers.push(
                                registeredUser
                            );
                        }
                    }


                    if (!userFound) {

                        setLoading(false);

                        reject(
                            new Error(
                                "Account not found."
                            )
                        );

                        return;
                    }


                    localStorage.setItem(
                        "registeredUsers",
                        JSON.stringify(
                            updatedUsers
                        )
                    );


                    setLoading(false);

                    resolve();

                }, 700);

            }
        );
    };


    /* =========================
       AUTH STATUS
    ========================= */

    const isAuthenticated =
        Boolean(user);


    /* =========================
       PROVIDER
    ========================= */

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                isAuthenticated,

                login,
                register,
                logout,

                updateProfile,
                changePassword,

                forgotPassword,
                resetPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


/* =========================
   USE AUTH
========================= */

export function useAuth() {

    return useContext(
        AuthContext
    );
}