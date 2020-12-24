import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core";
import { topgreen } from "../style/Color";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles({
    footer: {
        padding: "50px",
        minHeight: "30vh",
        backgroundColor: topgreen
    },
    whiteSeparator: {
        background: "white",
        width: "80px",
    },
    whiteText: {
        color: "white",
    },
});

const Footer = () => {
    const classes = useStyle();


    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={3}
            className={classes.footer}>
            <Grid item md={6} xs={12} id="library-details">
                <hr className={classes.whiteSeparator} />
                <Typography variant={"h6"} className={classes.whiteText}>AL AMIN DARUL MUSTHOFA SCHOOL</Typography>
                <p className={classes.whiteText}>No. 11, Jalan TIB 2, Taman Industri Bolton,</p>
                <p className={classes.whiteText}>68100 Batu Caves, Selangor Darul Ehsan</p>
            </Grid>
            <Grid item md={6} xs={12} id="library-opening-details">
                <hr className={classes.whiteSeparator} />
                <Typography variant={"h6"} className={classes.whiteText}>Library Opening Hours: 9am-6pm</Typography>
                <p className={classes.whiteText}>Email info: alamindarulmustofa@gmail.com</p>
            </Grid>

        </Grid>
    );
};

export default Footer;
