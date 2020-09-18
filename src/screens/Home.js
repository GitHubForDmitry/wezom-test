import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@material-ui/core";
import ImgMediaCard from '../components/Card';
import CustomizedInputBase from "../components/Search";
import SimpleSelect from "../components/SortGender";
import { ToastContainer, toast } from "react-toastify";
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

        dispatch(fetchCards()).then(data => setPersonList(data)).catch(e => toast(e.message));

        const fetchNationalities = async () => {

            await Promise.all(requests)
                .then(responses => Promise.all(responses.map(r => r.json())))
                .then(records => {
                    return records.map(data => data.results).flat().reduce((previousValue, currentValue, index) => {
                        if(!currentValue.country) {
                            return previousValue
                        }

                        return [...previousValue, {
                                id: index + 1, // number
                                country_name: currentValue.country.name, // record.country.name
                                nat_abbr:  currentValue.country.id.toLocaleUpperCase(), // record.country.id
                                nat_name:  currentValue.name,
                                // listOfCurrentNations: personList.find(person => {
                                //     console.log(person)
                                //   if(person.location.country === currentValue.country.name) {
                                //       console.log(currentValue.name)
                                //   }
                                // } )
                            // record.name
                        }]
                    }, [])
                })

                .then(nations => setNations(nations))

        }

        fetchNationalities();
    }, []);
    const dataList = !!personList && (personList.map(person => {
        return {...person,
            nations: nations.find(nation => {
                if(person.location.country === nation.country_name) {
                    return nation.nat_abbr
                }
            } ),

        }
    }))

    const allCountries = [... new Set(dataList.map(item => {
        if(!!item.nations) {
            return item.nations.nat_name
        }
    }))];

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

    if (error) {
            toast(`Error! ${error.message}`);
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
                    {dataList
                        .filter(item => !!searchValue ? item.name.first.toLowerCase().includes(searchValue) : true)
                        .filter(item => !!sortByGender ? item.gender === sortByGender : true)
                        .filter(item => !!sortByNationality.length ? sortByNationality.includes(item.nations.nat_name) : true)
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