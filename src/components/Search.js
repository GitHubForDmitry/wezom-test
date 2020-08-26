import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AppContext from "../context/app-context";
import {filterCards, filterCardsSuccess} from "../store/cardActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}));

export default function CustomizedInputBase({data}) {
    const classes = useStyles();
    const [filtered, setFiltered] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        const search = event.target.value;
        setFiltered(search);
        const filter = data.filter(
                person => [person.name.first]
                    .join('').toLowerCase().includes(search.toLowerCase())
            )
        console.log(filter);
        // dispatch(filterCardsSuccess(filter));
    };
    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search by name"
                value={filtered.toLowerCase()}
                onChange={(e) => handleSearch(e)}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}