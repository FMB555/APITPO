import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import { Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
      let number = "Respuesta " + (i+1).toString() + ":";
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
    const modalStyles={
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: "block",
    }

    return(
      <>
        <div>
          <AppBar>
            <Toolbar variant="dense">
              <ButtonGroup>
                <Button type="simple" onClick={() => this.abrirModal('simple')}>Pregunta Simple</Button>
                <Button type="compleja" onClick={() => this.abrirModal('compleja')}>Pregunta Compleja</Button>
                <Button type="multiple" onClick={() => this.abrirModal('multiple')}>Pregunta Opcion Multiple</Button>
                <Button type="unica" onClick={() => this.abrirModal('unica')}>Pregunta Seleccion Unica</Button>
                <Button type="archivo" onClick={() => this.abrirModal('archivo')}>Pregunta Carga De Archivo</Button>
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
            <Button>Guardar</Button>
            <Button>Guardar y Enviar</Button>
            <Button href='/Home'>Volver</Button>

        </div>

        <Modal id='Pregunta Simple' isOpen={this.state.active === 'simple'} style={modalStyles}>
        <ModalHeader>
            Pregunta Simple
        </ModalHeader>
        <ModalBody>
            <FormGroup>
            <Label>Escriba la pregunta</Label>
            <TextField
              id="PS"
              placeholder="Pregunta"
              multiline
              fullWidth
            />
            </FormGroup>
            <FormGroup>
            <Label>Cantidad de caracteres</Label>
            <Input type="number" id="PSC"/> 
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => this.preguntaSimple(document.getElementById('PS').value,document.getElementById('PSC').value)}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
        </ModalFooter>
        </Modal>
        
        <Modal id='Pregunta Compleja' isOpen={this.state.active === 'compleja'} style={modalStyles}>
        <ModalHeader>
          Pregunta Compleja
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Escriba la pregunta</Label>
              <TextField
                id="PC"
                placeholder="Pregunta"
                multiline
                fullWidth
              />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => this.preguntaCompleja(document.getElementById('PC').value)}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
        </ModalFooter>
        </Modal>

        <Modal id="Opcion múltipe" isOpen={this.state.active === 'multiple'} style={modalStyles}>
        <ModalHeader>
            Pregunta de opción múltiple
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Escriba la pregunta</Label>
            <TextField
              id="MUL"
              placeholder="Pregunta"
              multiline
              fullWidth
              onBlur={(q) => this.changeQuestion(q)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Ingrese la cantidad de respuestas</Label>
            <Input type="text" id="Cant" value={this.state.answersAmount} onInput={(c) => this.changeAnswers(c)}/>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => this.abrirModal('respuestas')}>Continuar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
        </ModalFooter>
        </Modal>

        <Modal id="Opción única" isOpen={this.state.active === 'unica'} style={modalStyles}>
        <ModalHeader>
            Pregunta de opción única
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Escriba la pregunta</Label>
            <TextField
              id="MUL"
              placeholder="Pregunta"
              multiline
              fullWidth
              onBlur={(q) => this.changeQuestion(q)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Ingrese la cantidad de respuestas</Label>
            <Input type="text" id="Cant" value={this.state.answersAmount} onChange={(c) => this.changeAnswers(c)} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => {this.abrirModal('respuestas')}} >Continuar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
        </ModalFooter>
        </Modal>

        <Modal id="Respuestas" isOpen={this.state.active === 'respuestas'} style={modalStyles}>
        <ModalHeader>
            Escriba las respuestas
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            {this.createInputs(this.state.answersAmount).map((answer) => answer)}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {this.opcionMultiple(this.state.question, this.state.answersList); this.resetAnswers()}}>
            Guardar
          </Button>
          <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
        </ModalFooter>
        </Modal>

        <Modal id="Archivo" isOpen={this.state.active === 'archivo'} style={modalStyles}>
        <ModalHeader>
            Pregunta con carga de archivos
        </ModalHeader>
        <ModalBody>
            <FormGroup>
            <Label>Escriba la pregunta</Label>
            <TextField
              id="ARC"
              placeholder="Pregunta"
              multiline
              fullWidth
            />
            </FormGroup>
            <FormGroup>
            <Label>Seleccione el tipo de documento</Label>
            <p></p>
            <Select id='TYPE' onChange={this.handleDocChange}>
                <MenuItem value='Word'>Word</MenuItem>
                <MenuItem value='PDF'>PDF</MenuItem>
                <MenuItem value='Excel'>Excel</MenuItem>
                <MenuItem value="jpg/png">jpg/png</MenuItem>
            </Select>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => this.preguntaArchivo(document.getElementById('ARC').value)}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
        </ModalFooter>
        </Modal>
    </>
     )
  }
}

export default Encuesta;