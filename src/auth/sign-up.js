import React, {useCallback, useState} from 'react';
import {
    Avatar,
    Button,
    Link,
    Grid,
    Container,
    TextField,
    Typography,
    CssBaseline
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import firebase from "../firebase/index";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CircularIndeterminate from "../components/Loader";
import CustomizedSnackbars from "../components/Notify";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        padding: '0 18px',
        fontSize: 14,
        color: '#f9f9f9'
    },
}));

function SignUp({ history }) {
    const classes = useStyles();

    const [error, setError] = useState({status: false, message: ''});
    const [loading, setLoading] = useState(false);

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;

        try {
            setLoading(true);
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(() => setLoading(false))
                .then(() => history.push('/home'));
        } catch (e) {
            setError({status: true, message: e.message});
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }

    }, []);

    return loading ? <CircularIndeterminate /> : <Container component="main" maxWidth="xs">
        {error.status && <CustomizedSnackbars status={error.status} errorMessage={error.message} />}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>

                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
}

export default withRouter(SignUp);