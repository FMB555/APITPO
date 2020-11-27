import React from 'react';

import UserTable from '../elements/userTable';
import CreateUser from '../elements/createUser';

import { AppBar, Box, Button, Container,
         CssBaseline, IconButton, Link, Toolbar,
         Typography } from '@material-ui/core';

import ArrowBack from '@material-ui/icons/ArrowBack';

import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const buttonStyles={
    margin: '5px',
    backgroundColor: "#009AA6",
    color: "#FFFFFF",
    marginTop: 30,
    "&:hover": {
        backgroundColor: "#00818a",
        color: "#FFFFFF",
    },
  }



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#EEE'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" style={{backgroundColor: "#009AA6"}}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            aria-label="return to home"
            aria-haspopup="true"
            href="home"
            style={{ color: "#FFF" }}
          >
            <ArrowBack />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Usuarios
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <UserTable />
          <CreateUser />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      
    </div>
    
    </>
  );
}