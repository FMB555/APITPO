import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


/*function preventDefault(event) {
  event.preventDefault();
}*/

function deleteForm(form) {
  cards.pop(form);
}

function duplicateForm(form) {
  cards.push(form);
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1, 
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    color: '#000000',
    backgroundColor: '#CCCCCC',
    '&:hover': {
      backgroundColor: '#AAAAAA',
    }
  }
}));
const cards = [["Tu Vida con corona virus", "12/9/2020"], ["Título 2", "23/9/2020"], ["Título 3", 3],
               ["Título 4", 4], ["Título 5", 5], ["Título 6", 6]];

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={cards.indexOf(card)} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card[0]}
                    </Typography>
                    <Typography>
                      Creación: {card[1]} 
                    </Typography>
                    <CardActions>
                      <Button size="small" color="primary" className={classes.button}>
                        Editar
                      </Button>
                      <Button size="small" color="primary" className={classes.button} onClick={(card) => deleteForm(card)}>
                        Borrar
                      </Button>
                      <Button size="small" color="primary" className={classes.button} onClick={(card) => duplicateForm(card)}>
                        Duplicar
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    </React.Fragment>
  );
}