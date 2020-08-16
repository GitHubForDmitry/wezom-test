import React, {useCallback, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CardMedia, AppBar, Toolbar, Grid } from '@material-ui/core';
import logoWezom from '../assets/images/icons/logo.svg';
import { Link } from 'react-router-dom';
import firebase from "../firebase/index";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

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


const NavBar = ({ history }) => {
    const classes = useStyles();
    const location = window.location.href.includes('signup');
    const [userName, setUserName] = useState('');
    const checkUser = () => firebase.auth().onAuthStateChanged(function(user) {
        try {
            if (user) {
                setUserName(user.email);
            }
        }
        catch (e) {
            toast(e.message);
        }
    });

    useEffect(() => {
        checkUser()
    }, [])

    const signOut = useCallback(async event => {
        event.preventDefault();
        try {
            await firebase.auth().signOut().then(history.push('/'));
        }
       catch (e) {
           toast(e.message);
       }
    }, [history]);

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
                          alignItems="center"
                    >
                            <Link to={`/sign${location ? 'up' : 'in'}`} className={classes.link} >
                                { !!userName ? userName : `${location ? 'Sign Up' : 'Sign In'}`}
                            </Link>
                            {!!userName &&
                                <Link onClick={signOut} to='/' className={classes.link} >
                                    Sign Out
                                </Link>
                            }
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default withRouter(NavBar)