import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import usersData from "../data/usersData";

const UsersContext = createContext(null);

const STORAGE_KEY = "authFlowUsers";


/* =====================================================
   USERS PROVIDER
===================================================== */

export function UsersProvider({ children }) {

    const [users, setUsers] = useState(() => {

        const savedUsers = localStorage.getItem(STORAGE_KEY);

        if (savedUsers) {

            try {
                return JSON.parse(savedUsers);
            } catch (error) {
                return usersData;
            }

        }

        return usersData;
    });


    /* =================================================
       SAVE USERS
    ================================================= */

    useEffect(() => {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(users)
        );

    }, [users]);


    /* =================================================
       GET USER BY ID
    ================================================= */

    const getUserById = (id) => {

        const numericId = Number(id);

        let selectedUser = null;

        for (let i = 0; i < users.length; i += 1) {

            if (Number(users[i].id) === numericId) {

                selectedUser = users[i];

                break;
            }
        }

        return selectedUser;
    };


    /* =================================================
       GET USER
       Alias for compatibility
    ================================================= */

    const getUser = (id) => {

        return getUserById(id);

    };


    /* =================================================
       ADD USER
    ================================================= */

    const addUser = (newUser) => {

        const newId = Date.now();

        const userToAdd = {
            ...newUser,
            id: newId
        };

        setUsers((currentUsers) => {

            return [
                ...currentUsers,
                userToAdd
            ];

        });

        return newId;
    };


    /* =================================================
       UPDATE USER
    ================================================= */

    const updateUser = (id, updatedUser) => {

        const numericId = Number(id);

        setUsers((currentUsers) => {

            return currentUsers.map((user) => {

                if (Number(user.id) === numericId) {

                    return {
                        ...user,
                        ...updatedUser,
                        id: user.id
                    };

                }

                return user;

            });

        });
    };


    /* =================================================
       DELETE USER
    ================================================= */

    const deleteUser = (id) => {

        const numericId = Number(id);

        setUsers((currentUsers) => {

            return currentUsers.filter((user) => {

                return Number(user.id) !== numericId;

            });

        });
    };


    /* =================================================
       RESET USERS
    ================================================= */

    const resetUsers = () => {

        setUsers(usersData);

    };


    /* =================================================
       CONTEXT VALUE
    ================================================= */

    const contextValue = {
        users,

        addUser,

        updateUser,

        deleteUser,

        getUser,

        getUserById,

        resetUsers
    };


    return (
        <UsersContext.Provider value={contextValue}>
            {children}
        </UsersContext.Provider>
    );
}


/* =====================================================
   USE USERS
===================================================== */

export function useUsers() {

    const context = useContext(UsersContext);

    if (!context) {

        throw new Error(
            "useUsers must be used inside UsersProvider"
        );

    }

    return context;
}