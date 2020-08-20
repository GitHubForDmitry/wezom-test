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
    const [countries, setCountries] = React.useState([]);
    const [personName, setPersonName] = React.useState([]);

    const load = async () => {
        try {
            const response = await axios(`https://randomuser.me/api/1.3?results=${countUsers}`);
            setData(response.data.results);
            const allCountries = [...new Set(response.data.results.map(item => item.location.country))];
            setCountries(allCountries);
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

    const handleChangeMultiple = (event) => {
        const val = event.target.value;
        setPersonName(val);
        const filterCountry = data.filter(item => item.location.country === val);
        console.log(personName);
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
                filterGender,
                countries,
                setPersonName,
                personName,
                handleChangeMultiple
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;

export { AppProvider };
