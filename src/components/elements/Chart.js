import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



function preventDefault(event) {
  event.preventDefault();
}
/*Tarea Jime: Agregale un borde */
const useStyles = makeStyles({
  depositContext: {
    flex: 1, 
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div id='cuadro'>
        <Typography component="p" variant="h4">
            Encuesta Hueca
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
            Creacion xx/yy/zzzz
        </Typography>
        <div>
            <Link color="primary" href="#" onClick={preventDefault}>
            Editar 
            </Link>
             *
            <Link color="primary" href="#" onClick={preventDefault}>
            Borrar 
            </Link>
            *
            <Link color="primary" href="#" onClick={preventDefault}>
            Copiar 
            </Link>
        </div>
      </div>
    </React.Fragment>
  );
}