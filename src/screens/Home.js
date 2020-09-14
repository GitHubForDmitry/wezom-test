import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@material-ui/core";
import ImgMediaCard from '../components/Card';
import CustomizedInputBase from "../components/Search";
import SimpleSelect from "../components/SortGender";
import { ToastContainer } from "react-toastify";
import MultipleSelect from "../components/MultipleSelect";
import {useDispatch, useSelector} from "react-redux";
import {fetchCards} from "../store/cardActions";
import SearchContainer from "../components/SearchContainer";

function Home() {
    const [personList, setPersonList] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [sortByGender, setSortByGender] = useState('');
    const [sortByNationality, setSortByNationality] = useState([]);
    const [toast, setToast] = useState('')

    const dispatch = useDispatch()

    const data = useSelector(data => data.cards);
    const { items, error, loading } = data;
    React.useEffect(() => {
        dispatch(fetchCards()).then(data => setPersonList(data))

    }, [])
    // const allCountries = [... new Set(items.map(item => !!item.location.country ? item.location.country : "country not selected"))];

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        let result = items.filter(item =>item.name.first.toLowerCase().includes(value));

        setPersonList([...result])
    }


    const handleChangeGender = (e) => {
        const value = e.target.value;
        setSortByGender(value);
        let result = items.filter(item => item.gender === sortByGender);

        console.log(result)
        setPersonList([...result])
    }

    const handleChangeMultiple = (e) => {
        const val = e.target.value;
        setSortByNationality(val);
    }

    // const multipleSelected = items.filter(function(e) {
    //     return selectedCountry.indexOf(e.location.country) > -1;
    // });

    if (error) {
            setToast(`Error! ${error.message}`);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <ToastContainer />
            <Box mb={2}>
                <SearchContainer
                    handleSearch={handleSearch}
                    searchValue={searchValue}
                />
            </Box>
            <Box mb={2}>
                <SimpleSelect sortByGender={sortByGender} handleChangeGender={handleChangeGender} />
            </Box>
            {/*<Box mb={2}>*/}
            {/*    <MultipleSelect allCountries={allCountries} handleChangeMultiple={handleChangeMultiple} selectedCountry={selectedCountry} />*/}
            {/*</Box>*/}
            <Box>
                <Grid container item xs={12} justify='flex-start'>
                    {/*{!items.length ? data*/}
                    {/*    .filter(item =>*/}
                    {/*        item.name.first.toLowerCase().includes(filter))*/}

                    {/*    .map((item, index) => <ImgMediaCard key={index} data={item}/>) :*/}
                    {/*.filter(item =>*/}
                    {/*item.name.first.toLowerCase().includes(filter))*/}

                    {/*{value.length*/}
                    {/*    ?*/}
                    {/*    filteredProducts.map((item, index) => <ImgMediaCard key={index} data={item}/> )*/}
                    {/*    :*/}
                    {personList.map((item, index) => <ImgMediaCard key={index} data={item}/>)
                    }
                </Grid>
            </Box>
            {/*<Box>*/}
            {/*    <Statistic data={data}/>*/}
            {/*</Box>*/}
        </main>
    );
}

export default Home;