import React, { useState, useEffect } from "react";
import firebase from "../firebase/index";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AppContext.Provider
            value={{
                currentUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;

export { AppProvider };
