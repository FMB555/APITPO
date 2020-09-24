import React from 'react';
import AppBar from '../elements/AppBar'
import Chart from '../elements/Chart'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 0, 0),
        backgroundColor: "#009AA6",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#00818a",
            color: "#FFFFFF",
        }
    },
}))

export default function Home() {
    const classes = useStyles();

    return(
        <>
            <AppBar />
            <div className="jumbotron">
                <h1>
                    Encuestas
                </h1>
                <div>
                    <Button
                    type="root"
                    variant="contained"
                    className={classes.button}
                    href='/crearEncuesta'
                    >
                        +
                    </Button>
                </div>
                <div>
                    <Chart/>
                </div>
            </div>    
        </>
    )
}