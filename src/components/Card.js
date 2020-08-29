import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import WcIcon from '@material-ui/icons/Wc';
import FlagIcon from '@material-ui/icons/Flag';

const useStyles = makeStyles({
    root: {
        maxWidth: 280,
        width: '100%',
        marginBottom: 30,
        marginRight: 30,
        position: 'relative'
    },
    name: {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        top: 310,
        left: '50%',
        transform: 'translateX(-50%)',
        color: "#fff",
        fontWeight: 700,
        background: 'rgba(0, 0, 0, 0.3)'
    },
    link: {
        textDecoration: 'none',
        display: 'block',
        color: '#1976d2',
    },
    text: {
        color: '#1976d2',
    },
    imageWrap: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});

export default function ImgMediaCard({ data }) {
    const classes = useStyles();
    return (
        <Card className={classes.root} pr={2}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={`${data.name.first} ${data.name.last}`}
                    height="340"
                    image={data.picture.large}
                    title={`${data.name.first} ${data.name.last}`}
                >

                </CardMedia>
                <CardContent>
                    <Typography className={classes.name} gutterBottom variant="h5" component="h2" noWrap>
                        {data.name.title}{' '}
                        {data.name.first}{' '}
                        {data.name.last}{' '}
                    </Typography>
                    <Grid item xs={8} className={classes.imageWrap}>
                        <Box  mr={2}>
                            <PhoneIcon color="primary" mr={2}/>
                        </Box>
                        <Link to={`tel:${data.phone}`} className={classes.link}>
                            {data.phone}
                        </Link>
                    </Grid>
                    <Grid item xs={8} className={classes.imageWrap}>
                        <Box  mr={2}>
                            <EmailIcon color="primary"/>
                        </Box>
                        <Link to={`mailto:${data.email}`} className={classes.link}>
                            {data.email}
                        </Link>
                    </Grid>
                    <Grid item xs={8} className={classes.imageWrap}>
                        <Box  mr={2}>
                            <LocationOnIcon color="primary"/>
                        </Box>
                        <Typography className={classes.text} component='p'>
                            {data.location.city}
                        </Typography>
                    </Grid>
                    <Grid item xs={8} className={classes.imageWrap}>
                            <Box  mr={2}>
                                <FlagIcon color="primary"/>
                            </Box>
                        <Typography className={classes.text} component='p'>
                            {data.location.country}
                        </Typography>
                    </Grid>
                    <Grid item xs={8} className={classes.imageWrap}>
                        <Box  mr={2}>
                            <WcIcon color="primary"/>
                        </Box>
                        <Typography className={classes.text} component='p'>
                            {data.gender}
                        </Typography>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}