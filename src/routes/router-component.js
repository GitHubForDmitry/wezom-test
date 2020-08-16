import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    Button
} from "@material-ui/core";
import {IOptions as classes} from "glob";
import SettingsIcon from "@material-ui/icons/Settings";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Contacts from "../screens/Contacts";
import Home from "../screens/Home";
import Main from "../screens/Main";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavBar from "../components/NavBar";
import background from "../assets/images/background/main-background.jpg";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 0,
        zIndex: 1,
        height: "100vh",
        objectFit: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflowX: "hidden",
        minHeight: "100%",
        maxHeight: "100%",
        backgroundImage: `url(${background})`,
        position: 'relative',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
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

function RouterComponent(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    return (
        <Router>
            <Box className={classes.root}>
                <Box className={classes.subRoot}>
                    <Grid container direction="row">
                        <Grid container direction="row" justify="space-around">
                            <NavBar/>
                        </Grid>
                    </Grid>
                    <Switch>
                        <Route exact path="/">
                            <Main />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/contacts">
                            <Contacts />
                        </Route>
                    </Switch>
                </Box>
            </Box>
        </Router>
    );
}

export default RouterComponent;