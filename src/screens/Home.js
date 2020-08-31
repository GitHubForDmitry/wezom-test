import React, {useState} from 'react';
import {Box, Grid} from "@material-ui/core";
import ImgMediaCard from '../components/Card';
import CustomizedInputBase from "../components/Search";
import SimpleSelect from "../components/SortGender";
import { ToastContainer } from "react-toastify";
import MultipleSelect from "../components/MultipleSelect";

function Home({ items, error, loading }, props) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredGender, setFilteredGender] = useState({status: false, filter: ''});
    const [value, setValue] = useState('');
    const [gender, setGender] = useState('');
    const [toast, setToast] = useState('');
    const [selectedCountry, setSelectedCountry] = useState([]);

    const allCountries = [... new Set(items.map(item => !!item.location.country ? item.location.country : "country not selected"))];
    console.log(allCountries);
    const handleChange = (e) => {
        const val = e.target.value;

        switch (val) {
            case 'male':
                setFilteredGender({status: true, filter: 'male'});
                return;
            case 'female':
                setFilteredGender({status: true, filter: 'female'});
                return;
            case 'indeterminate':
                setFilteredGender({status: true, filter: 'indeterminate'});
                return;
            default:
                return items;
        }
    }

    const handleChangeMultiple = (e) => {
        const val = e.target.value;
        setSelectedCountry(val);
    }

    const multipleSelected = items.filter(function(e) {
        return selectedCountry.indexOf(e.location.country) > -1;
    });

    console.log(multipleSelected);
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
                <CustomizedInputBase
                    data={items}
                    filteredProducts={filteredProducts}
                    setFilteredProducts={setFilteredProducts}
                    value={value}
                    setValue={setValue}
                />
            </Box>
            <Box mb={2}>
                <SimpleSelect gender={gender} handleChange={handleChange} />
            </Box>
            <Box mb={2}>
                <MultipleSelect allCountries={allCountries} handleChangeMultiple={handleChangeMultiple} selectedCountry={selectedCountry} />
            </Box>
            <Box>
                <Grid container item xs={12} justify='flex-start'>
                    {/*{!items.length ? data*/}
                    {/*    .filter(item =>*/}
                    {/*        item.name.first.toLowerCase().includes(filter))*/}

                    {/*    .map((item, index) => <ImgMediaCard key={index} data={item}/>) :*/}
                    {/*.filter(item =>*/}
                    {/*item.name.first.toLowerCase().includes(filter))*/}

                    {value.length
                        ?
                        filteredProducts.map((item, index) => <ImgMediaCard key={index} data={item}/> )
                        :
                        (items.map((item, index) => <ImgMediaCard key={index} data={item}/>).filter(item => filteredGender.status ? item.props.data.gender === filteredGender.filter : item))
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