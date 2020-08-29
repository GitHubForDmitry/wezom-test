import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AppContext from "../context/app-context";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

export default function SimpleSelect({ gender, handleChange }) {
    const classes = useStyles();

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                    native
                    required
                    value={gender}
                    onChange={handleChange}
                >
                    <option value={'female'}>Female</option>
                    <option value={'male'}>Male</option>
                    <option value={'indeterminate'}>Indeterminate</option>
                </Select>
            </FormControl>
        </>
    );
}