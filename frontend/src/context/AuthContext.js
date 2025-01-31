import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ token: null, isAuthenticated: false });

    const login = (token) => setAuthState({ token, isAuthenticated: true });
    const logout = () => setAuthState({ token: null, isAuthenticated: false });

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
