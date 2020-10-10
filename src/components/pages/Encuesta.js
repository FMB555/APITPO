import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { Select, MenuItem, Drawer } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../logos/isologotipo-negativo.png";

import clsx from 'clsx';



class Encuesta extends React.Component {
  

  encuestas = []

  state={
    active:'',
    answersAmount:1,
    doc:'none',
    answersList:[],
    question:'',
  }

  preguntaSimple = (text, car) =>{
    this.encuestas.push(`La pregunta es: ${text}\nCantidad de caracters: ${car}\n`)
    this.cerrarModal()
  }

  preguntaCompleja = (text) =>{
    this.encuestas.push(`La pregunta es: ${text}\n`)
    this.cerrarModal()
  }

  preguntaArchivo = (text) => {
    this.encuestas.push(`La pregunta es: ${text}\nFormato: ${this.state.doc}\n`)
    this.cerrarModal()
  }

  opcionMultiple = (text, ans) => {
    let form = '';
    form = form.concat('La pregunta es: ', text.toString(), '\nRespuestas:\n');
    for (let i = 0; i < ans.length; i++) {
      form = form.concat(ans[i].toString() + '\n')
    }
    this.encuestas.push(form)
    this.cerrarModal()
  }

  abrirModal = (id) => {
    this.setState({active: id});
  }
  
  cerrarModal = () => {
    this.setState({active: ''});
  }

  changeAnswers = (cant) => {
    this.setState({answersAmount: cant.target.value})
  }

  createInputs = (cant) => {
    let lista = [];
    for (let i = 0; i < cant; i++) {
      let number = "Opcion " + (i+1).toString() + ":";
      lista.push(<Label>{number}</Label>);
      lista.push(<TextField id="ANSWERS" placeholder="Respuesta" multiline fullWidth onBlur={(resp) => this.addAnswer(resp.target.value)} />);
    }
    return lista;
  }

  createEncuestas = (encuestas) => {
    let resultado = [];
    for (let i = 0; i < encuestas.length; i++) {
      resultado.push(<Paper  elevation={3}>{encuestas[i].split('\n').map(i => { return <p>{i}</p>})}</Paper>)
    }
    return resultado
  }

  addAnswer = (answer) => {
    this.state.answersList.push(answer);
  }

  resetAnswers = () => {
    this.setState({answersList: []})
  }

  handleDocChange = (event) => {
    this.setState({
      doc: event.target.value,
    })
  }

  changeQuestion = (newQuestion) => {
    this.setState({
      question: newQuestion.target.value,
    })
  }
  
  
 
  
  render() {
    const buttonStyles={
      margin: '5px',
      backgroundColor: "#009AA6",
      color: "#FFFFFF",
      "&:hover": {
          backgroundColor: "#00818a",
          color: "#FFFFFF",
      },
    }

    const modalStyles={
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: "block",
    }

    const appStyles={
      backgroundColor: "#009AA6",
    }


    return(
      <>
        <div>
          <AppBar style={appStyles}>
            <Toolbar variant="dense" color = 'green'>
            
              <img src={logo} alt="isologotipo negativo" height="50"/>
              <ButtonGroup>
                <Button style={buttonStyles} type="simple" onClick={() => this.abrirModal('simple')}>Pregunta Simple</Button>
                <Button style={buttonStyles} type="compleja" onClick={() => this.abrirModal('compleja')}>Pregunta Compleja</Button>
                <Button style={buttonStyles} type="multiple" onClick={() => this.abrirModal('multiple')}>Pregunta Opcion Multiple</Button>
                <Button style={buttonStyles} type="unica" onClick={() => this.abrirModal('unica')}>Pregunta Seleccion Unica</Button>
                <Button style={buttonStyles} type="archivo" onClick={() => this.abrirModal('archivo')}>Pregunta Carga De Archivo</Button>
              </ButtonGroup>
            

            </Toolbar>
          </AppBar>

          <Paper elevation={3} className="jumbotron">
            <Typography>
              <TextField
                id="title"
                label="Título de la encuesta"
                placeholder="Título"
                multiline
                fullWidth
              />
            </Typography>
            <TextField
              id="descripcion"
              label="Descripción"
              placeholder="Descripción"
              multiline
              fullWidth
            />
          </Paper>
          
            <div className="jumbotron" id='ver'>
                {this.createEncuestas(this.encuestas)}
            </div>
            <Button style={buttonStyles}>Borrar Pregunta</Button>
            <Button style={buttonStyles}>Guardar</Button>
            <Button style={buttonStyles} >Guardar y Publicar</Button>
            <Button style={buttonStyles} href='/Home'>Volver</Button>
            
        </div>
    </>
     )
  }
}

export default Encuesta;