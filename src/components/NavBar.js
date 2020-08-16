import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CardMedia, AppBar, Toolbar, Paper, Avatar, Grid} from '@material-ui/core';
import AppContext from '../context/app-context';
import logoWezom from '../assets/images/icons/logo.svg';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        padding: '0 18px',
        fontSize: 14,
        color: '#f9f9f9'
    },
    toolbar: {
        justifyContent: 'space-between',
        width: '100vw'
    },
    logo: {
        width: 57,
        height: 21
    }
}));

const NavBar = (props) => {
    const classes = useStyles();
    return (
        <Grid className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Grid
                          item
                          xs={10}
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                    >
                        <Link to='/' className={classes.link} >
                            <CardMedia image={logoWezom} className={classes.logo} />
                        </Link>
                        <Link to='/home' className={classes.link} >
                            Home
                        </Link>
                        <Link to='/contacts' className={classes.link} >
                            contacts
                        </Link>
                    </Grid>
                    <Grid item
                          xs={2}
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center">
                        <Link to='/signin' className={classes.link} >
                            Sign In
                        </Link>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default (NavBar)