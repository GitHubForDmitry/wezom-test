import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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

export default function Search({items, filterCards}) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    return (
        <React.Fragment>
        {
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search by name"
                        value={value}
                        onChange={event => {
                            const val = event.target.value;
                            setValue(val);
                            filterCards(items, value)
                          }
                        }
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

        }
        </React.Fragment>
    );
}