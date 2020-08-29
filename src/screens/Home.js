import React, {useState} from 'react';
import {Box, Grid} from "@material-ui/core";
import ImgMediaCard from '../components/Card';
import CustomizedInputBase from "../components/Search";

function Home({ items, error, loading }) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [value, setValue] = useState('');

    if (error) {
        return <div>Error! {error.message}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <Box mb={2}>
                <CustomizedInputBase data={items} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} value={value}
                                     setValue={setValue}/>
            </Box>
            {/*<Box mb={2}>*/}
            {/*    <SimpleSelect />*/}
            {/*</Box>*/}
            {/*<Box mb={2}>*/}
            {/*    <MultipleSelect countries={countries} />*/}
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