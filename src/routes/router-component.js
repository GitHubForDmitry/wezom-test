import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {
    Box,
    Grid,
} from "@material-ui/core";
import Contacts from "../screens/Contacts";
import Main from "../screens/Main";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavBar from "../components/NavBar";
import background from "../assets/images/background/main-background.jpg";
import SignIn from "../auth/sign-in";
import SignUp from "../auth/sign-up";
import Copyright from "../components/Copyright";
import PrivateRoute from "./private-route";
import Home from "../screens/Home";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between',
        objectFit: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`,
    },

    paper: {
        position: "absolute",
        top: 10,
        left: 10,
        textAlign: "center",
        color: theme.palette.text.primary,
        backgroundColor: "#f1f1f1",
        zIndex: 20
    },
    media: {
        width: 50,
        height: 50,
        margin: "0 auto",
        paddingHorizontal: 20
    },

    icon: {
        width: 50,
        height: 50,
    }
}));

function RouterComponent() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>

            <Router>
                <header>
                    <Grid container direction="row">
                        <Grid container direction="row" justify="space-around">
                            <NavBar/>
                        </Grid>
                    </Grid>
                </header>

                <Switch>
                    <PrivateRoute exact path='/' component={Home}/>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    <Route path="/contacts">
                        <Contacts/>
                    </Route>
                    <Route path="/signin">
                        <SignIn/>
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                </Switch>
                <footer>
                    <Copyright/>
                </footer>
            </Router>
        </Box>

    );
}

export default RouterComponent;