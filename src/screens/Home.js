import React, {useState} from 'react';
import {Box, Grid} from "@material-ui/core";
import ImgMediaCard from '../components/Card';
import CustomizedInputBase from "../components/Search";
import SimpleSelect from "../components/SortGender";
import MultipleSelect from "../components/MultipleSelect";

function Home({ items, error, loading }) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [value, setValue] = useState('');
    const [gender, setGender] = useState('');

    const handleChange = (e) => {
        const val = e.target.value;
        console.log(items);
        console.log(val);

        switch (val) {
            case 'male':
                return items.filter(person => person.gender === val);
            case 'female':
                return items.filter(person => person.gender === val);
            case 'indeterminate':
                return items.filter(person => person.gender === val);
            default:
                return items;
        }
    }

    console.log(gender);

    if (error) {
        return <div>Error! {error.message}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
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
            {/*<Box mb={2}>*/}
            {/*    <MultipleSelect countries={[]} />*/}
            {/*</Box>*/}
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
                        (items.map((item, index) => <ImgMediaCard key={index} data={item}/>))
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