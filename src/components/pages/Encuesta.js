import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button1 from '@material-ui/core/Button';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import { Select, MenuItem } from '@material-ui/core';



class Encuesta extends React.Component {

  encuestas = []



  state={
    active: '',
    answers:1,
  }

  preguntaSimple = (text, car) =>{
        this.encuestas.push(`La pregunta es: ${text}\nCantidad de caracters: ${car}\n`)
        this.cerrarModal()
  }

  preguntaCompleja = (text) =>{
    this.encuestas.push(`La pregunta es: ${text}\n`)
    this.cerrarModal()
  }

  abrirModal = (id) => {
    this.setState({active: id});
  }
  
  cerrarModal = () => {
    this.setState({active: ''});
  }

  changeAnswers = (cant) => {
    this.setState({answers: cant.target.value})
  }

  createInputs = (cant) => {
    let lista = [];
    for (let i = 0; i < cant; i++) {
      let number = "Respuesta " + (i+1).toString() + ":";
      lista.push(<Label>{number}</Label>);
      lista.push(<Input type="text" id="answer" />);
    }
    return lista;
  }

  render() {
    const modalStyles={
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
    return(
      <>
        <div className="app container">
            <div className="jumbotron">
                    <h1>Main Title to complete</h1>
            </div>
        
            <div className="jumbotron">
                <ButtonGroup>
                    <Button1 type="simple" onClick={() => this.abrirModal('simple')}>Pregunta Simple</Button1>
                    <Button1 type="compleja" onClick={() => this.abrirModal('compleja')}>Pregunta Compleja</Button1>
                    <Button1 type="multiple" onClick={() => this.abrirModal('multiple')}>Pregunta Opcion Multiple</Button1>
                    <Button1 type="unica" onClick={() => this.abrirModal('unica')}>Pregunta Seleccion Unica</Button1>
                    <Button1 type="archivo" onClick={() => this.abrirModal('')}>Pregunta Multiple Seleccion Unica</Button1>
                    <Button1 type="archivo" onClick={() => this.abrirModal('archivo')}>Pregunta Carga De Archivo</Button1>
                </ButtonGroup>
            </div>
            <div className="jumbotron" id='ver'>
                {this.encuestas}
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
            <Input type="text" id="PS"/> 
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
            <Input type="text" id="PC"/> 
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
            <Input type="text" id="Text" />
            </FormGroup>
            <FormGroup>
            <Label>Ingrese la cantidad de respuestas</Label>
            <Input type="text" id="Cant" value={this.state.answers} onChange={(c) => this.changeAnswers(c)}/>
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
            <Input type="text" id="Text" />
            </FormGroup>
            <FormGroup>
            <Label>Ingrese la cantidad de respuestas</Label>
            <Input type="text" id="Cant" value={this.state.answers} onChange={(c) => this.changeAnswers(c)} />
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
            {this.createInputs(this.state.answers).map((answer) => answer)}
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary">Guardar</Button>
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
            <Input type="text" id="arc" />
            </FormGroup>
            <FormGroup>
            <Label>Seleccione el tipo de documento</Label>
            <p></p>
            <Select id='type'>
                <MenuItem value='word'>Word</MenuItem>
                <MenuItem value='pdf'>PDF</MenuItem>
                <MenuItem value='excel'>Excel</MenuItem>
                <MenuItem value="imagen">jpg/pgn</MenuItem>
            </Select>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary">Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
        </ModalFooter>
        </Modal>
    </>
     )
  }
}

export default Encuesta