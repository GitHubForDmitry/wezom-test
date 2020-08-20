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

export default function SimpleSelect() {
    const classes = useStyles();
    const { gender, handleChange } = useContext(AppContext);



    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    onChange={handleChange}
                >
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'indeterminate'}>Indeterminate</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}