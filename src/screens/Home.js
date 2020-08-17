import React, {useContext, useEffect} from 'react';
import AppContext from "../context/app-context";
import {Box, Grid} from "@material-ui/core";
import ImgMediaCard from '../components/Card';
import CustomizedInputBase from "../components/Search";
import useDebounce from "../features/debounce";
import CircularIndeterminate from "../components/Loader";
import SimpleSelect from "../components/SortGender";

function Home(props) {

    const { data, filter, gender } = useContext(AppContext)
    return (
        <main>
            <Box mb={2}>
                <CustomizedInputBase  />
            </Box>
            <Box mb={2}>
                <SimpleSelect />
            </Box>
            <Box>
                <Grid container item xs={12} justify='flex-start'>
                    {useDebounce(data
                        .filter(item =>
                            item.name.first.toLowerCase().includes(filter))
                        .filter(item => item.gender.includes(gender))
                        .map((item, index) => <ImgMediaCard key={index} data={item}/> ), 1000)}
                </Grid>
            </Box>
        </main>
    );
}

export default Home;