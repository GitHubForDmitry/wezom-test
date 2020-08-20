import React, { useState, useEffect } from "react";
import firebase from "../firebase/index";
import axios from "axios";
import { toast } from "react-toastify";
import { countUsers } from "../features/randomCountUsers";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState('');
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [loader, setLoader] = useState(false);
    const [gender, setGender] = React.useState('');
    const [filterGender, setFilterGender] = React.useState('');

    const load = async () => {
        try {
            const response = await axios(`https://randomuser.me/api/1.3?results=${countUsers}`);
            setData(response.data.results);
        } catch (e) {
            toast(e.message)
        }
    };
    const filterSex = (data, sex) => {
        let filtered = data.filter((obj) => obj.gender === sex);
        setFilterGender(filtered);
    }
    const handleChange = (event) => {
        setGender(event.target.value);
        filterSex(data, event.target.value);
    };

    useEffect(() => {
        load();
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AppContext.Provider
            value={{
                currentUser,
                data,
                filter,
                setFilter,
                loader,
                setLoader,
                setData,
                handleChange,
                gender,
                filterGender
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;

export { AppProvider };
