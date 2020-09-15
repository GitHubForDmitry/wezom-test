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

export default function SimpleSelect({ sortByGender, handleChangeGender }) {
    const classes = useStyles();
    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Choose gender</InputLabel>
                <Select
                    native
                    required
                    value={sortByGender}
                    onChange={(event => handleChangeGender(event))}
                >
                    <option value={''}>All</option>
                    <option value={'female'}>Female</option>
                    <option value={'male'}>Male</option>
                    <option value={'indeterminate'}>Indeterminate</option>
                </Select>
            </FormControl>
        </>
    );
}