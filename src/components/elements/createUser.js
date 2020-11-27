import React from 'react';

import { Button, TextField, Grid, Checkbox,
         FormControlLabel, Paper, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#009CA6",
        color: "#FFFFFF",
        maxWidth: "40%",
        "&:hover": {
            backgroundColor: "#00818a",
        }
    },
}));

export default function createUser() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    return (
        <Paper component='main' elevation={3}
            style={{ width: '75%', margin: 'auto', borderRadius: 10 }}>
            <div style={{
                color: "#FFF",
                backgroundColor: "#009AA6",
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                padding: 15 }}>
                <Typography component='h2' variant='h5'>
                    Agregar
                </Typography>
            </div>
            <div className={classes.paper} style={{ marginLeft: 50, marginRight: 50 }}>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="legajo"
                                label="Legajo"
                                name="legajo"
                                autoComplete="legajo"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Correo electrónico"
                                name="email"
                                autoComplete="email"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Administrador"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Agregar usuario
                    </Button>
                </form>
            </div>
        </Paper>
    );
}
