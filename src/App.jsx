import React from "react";

import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { UsersProvider } from "./context/UsersContext";

import "./App.css";

function App() {

    return (
        <AuthProvider>
            <ToastProvider>
                <UsersProvider>
                    <AppRoutes />
                </UsersProvider>
            </ToastProvider>
        </AuthProvider>
    );
}

export default App;