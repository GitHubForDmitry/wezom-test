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
    const [nations, setNations] = useState([]);
    const [toast, setToast] = useState('')

    const dispatch = useDispatch()

    const data = useSelector(data => data.cards);
    const { items, error, loading } = data;
    let urls = [
        'https://rest.gadventures.com/nationalities',
        'https://rest.gadventures.com/nationalities?page=2',
        'https://rest.gadventures.com/nationalities?page=3',
        'https://rest.gadventures.com/nationalities?page=4',
        'https://rest.gadventures.com/nationalities?page=5',
    ];

    let requests = urls.map(url => fetch(url, {
        method: 'GET',

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Application-Key': 'test_75214fe99c78f9f47d355a7af0c9e9f152ba81ff',
        },
    }));



    useEffect(() => {
        dispatch(fetchCards()).then(data => setPersonList(data));

        const fetchNationalities = () => {

            Promise.all(requests)

                .then(responses => Promise.all(responses.map(r => r.json())))
                // все JSON-ответы обработаны, users - массив с результатами
                .then(users => users.map(user => (user.results.map(item => item)))).then(item =>
                console.log(item.flat())
            );
        }

        fetchNationalities();
    }, []);

    // const result = [].concat(nations.map(item => !!item.country ? item.country.name : 'not exist'));
    console.log(nations)

    const allCountries = [... new Set(items.map(item => !!item.location.country ? item.location.country : "country not selected"))];

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    const handleChangeGender = (e) => {
        const value = e.target.value;
        setSortByGender(value);
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
            <Box mb={2}>
                <MultipleSelect allCountries={allCountries} handleChangeMultiple={handleChangeMultiple} sortByNationality={sortByNationality} />
            </Box>
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
                    {personList
                        .filter(item => !!searchValue ? item.name.first.toLowerCase().includes(searchValue) : true)
                        .filter(item => !!sortByGender ? item.gender === sortByGender : true)
                        .map((item, index) => <ImgMediaCard key={index} data={item}/>)
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