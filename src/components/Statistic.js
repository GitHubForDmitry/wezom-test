import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppContext from "../context/app-context";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '20px'
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function Statistic({data}) {
    const classes = useStyles();


    const dataLength = data.length;
    const female = data.filter(sex => sex.gender === 'female').length;
    const male = data.filter(sex => sex.gender === 'male').length;
    const filterCountry = (country) => data.filter(item => item.location.country === country.country).length;
    const countriesLocation = data.map(item => {return {country: item.location.country}});
    const countriesCount = countriesLocation.map(country => { return {...country, count: filterCountry(country)}});
    const arr = countriesCount.filter((obj, pos) => {
        return countriesCount.map(mapObj => mapObj.country).indexOf(obj.country) === pos;
    });
    console.log(arr);
    return (
        <div >
            <Paper className={classes.root} elevation={3}>
            <Typography variant='h5'>
                Statistic
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Collection size" />
                    <ListItemText primary={dataLength} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Female" />
                    <ListItemText primary={female} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Male" />
                    <ListItemText primary={male} />
                </ListItem>
                {arr.map((item, i) => {
                        return (
                            <React.Fragment key={i}>
                                <ListItem>
                                    <ListItemText primary={item.country}/>
                                    <ListItemText primary={item.count}/>
                                </ListItem>
                                <li></li>
                            </React.Fragment>
                        )
                    }
                )}
            </List>
            <Divider />
            </Paper>
        </div>
    );
}