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

    useEffect(() => {
        const urls = [
            'https://rest.gadventures.com/nationalities',
            'https://rest.gadventures.com/nationalities?page=2',
            'https://rest.gadventures.com/nationalities?page=3',
            'https://rest.gadventures.com/nationalities?page=4',
            'https://rest.gadventures.com/nationalities?page=5',
        ];

        const requests = urls.map(url => fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Application-Key': 'test_75214fe99c78f9f47d355a7af0c9e9f152ba81ff', //env
            },
        }));

        dispatch(fetchCards()).then(data => setPersonList(data));
        // interface IObj {
        //     id: number;
        //     country_name: string;
        //     nat_abbr: string;
        //     nat_name: string;
        // }
        //
        // const obj: IObj = {
        //     id: 1, // number
        //     country_name: 'Armenia', // record.country.name
        //     nat_abbr: 'AF', // record.country.id
        //     nat_name: 'Armenian', // record.name
        // };
        // const test = {
        //     id: 1,
        //     nat_abbr: 'AF', // record.country.id
        //     country_name: 'Afghanistan', // record.country.name
        //     nat_name: 'Afghanistan_nat', // record.name
        // };

        // const obj = {
        //     id: 1, // number
        //     country_name: 'Armenia', // record.country.name
        //     nat_abbr: 'AF', // record.country.id
        //     nat_name: 'Armenian', // record.name
        // };

        const fetchNationalities = async () => {

            await Promise.all(requests)
                .then(responses => Promise.all(responses.map(r => r.json())))
                .then(records => {
                    console.log(records.map(data => data.results).flat())// попробовать с reduce
                    return records.map(data => data.results).flat().reduce((previousValue, currentValue, index) => {
                        if(!currentValue.country) {
                            return previousValue
                        }
                        return [...previousValue, {
                                id: index + 1, // number
                                country_name: currentValue.country.name, // record.country.name
                                nat_abbr:  currentValue.country.id.toLocaleUpperCase(), // record.country.id
                                nat_name:  currentValue.name
                            // record.name
                        }]
                    }, [])
                })
                .then(nations => console.log(nations))

        }

        fetchNationalities();
    }, []);

    const result = [].concat(nations.map(item => !!item.country ? item.country.name : 'not exist'));
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