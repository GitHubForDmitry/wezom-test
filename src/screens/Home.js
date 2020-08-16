import React, {useContext, useEffect} from 'react';
import AppContext from "../context/app-context";
import {Box, Grid} from "@material-ui/core";
import ImgMediaCard from '../components/Card';

function Home(props) {

    const { data } = useContext(AppContext)

    console.log(data);
    return (
        <main>
            <Box>
                <Grid container item xs={12} justify='flex-start'>
                    {data.map((item, index) => <ImgMediaCard key={index} data={item}/> )}
                </Grid>
            </Box>
        </main>
    );
}

export default Home;