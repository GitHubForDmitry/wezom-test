import React, {useContext, useEffect} from 'react';
import AppContext from "../context/app-context";
import {Box, Grid} from "@material-ui/core";
import ImgMediaCard from '../components/Card';
import CustomizedInputBase from "../components/Search";
import useDebounce from "../features/debounce";
import CircularIndeterminate from "../components/Loader";
import SimpleSelect from "../components/SortGender";
import MultipleSelect from "../components/MultipleSelect";
import Typography from "@material-ui/core/Typography";

function Home(props) {

    const { data, filter, filterGender, countries } = useContext(AppContext);

    return (
        <main>
            <Box mb={2}>
                <CustomizedInputBase  />
            </Box>
            <Box mb={2}>
                <SimpleSelect />
            </Box>
            <Box mb={2}>
                <MultipleSelect countries={countries} />
            </Box>
            <Box>
                <Grid container item xs={12} justify='flex-start'>
                    {!filterGender.length ? data
                        .filter(item =>
                            item.name.first.toLowerCase().includes(filter))

                        .map((item, index) => <ImgMediaCard key={index} data={item}/>) :
                        filterGender
                            .filter(item =>
                                item.name.first.toLowerCase().includes(filter))

                            .map((item, index) => <ImgMediaCard key={index} data={item}/>)
                    }
                </Grid>
            </Box>
        </main>
    );
}

export default Home;