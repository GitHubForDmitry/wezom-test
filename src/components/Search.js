import React, {useCallback, useEffect, useRef, useState} from 'react';
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

export default function CustomizedInputBase({data, setFilteredProducts, value, setValue}) {
    const classes = useStyles();
    const [selectProducts, setSelectProducts] = useState({});
    const onProductSearch = useCallback((name) => {
        name = name.trim();
        const filteredProducts = name.length
            ? data.filter(card => card.name.first.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
            : [];
        setFilteredProducts(filteredProducts);
    }, [data]);

    const inputRef = useRef(null);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.keyCode === 27) {
                setValue('');
                onProductSearch('');
            }
        };

        inputRef.current && inputRef.current.focus();

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onProductSearch]);

    return (
        <React.Fragment>
        {
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search by name"
                        value={value}
                        onChange={(event) => {
                            const name = event.target.value;
                            setValue(name);
                            onProductSearch(name.trim());
                        }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

        }
        </React.Fragment>
    );
}