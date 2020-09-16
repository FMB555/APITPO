import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button1 from '@material-ui/core/Button';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';




class AddElement extends React.Component {
  state={
    abierto: false,
  }

  abrirModal=(id)=>{
    this.setState({abierto: !this.state.abierto});
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
      <div>
        
          <ButtonGroup>
            <Button1 type="simple" onClick={this.abrirModal}>Pregunta Simple</Button1>
            <Button1 type="compleja">Pregunta Compleja</Button1>
            <Button1 type="multiple">Pregunta Opcion Multiple</Button1>
            <Button1 type="unica">Pregunta Seleccion Unica</Button1>
            <Button1 type="archivo">Pregunta Carga De Archivo</Button1>
          </ButtonGroup>

         
      
      </div>
      
      <Modal id='Pregunta Simple' isOpen={this.state.abierto} style={modalStyles}>
      <ModalHeader>
        Pregunta Simple
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Escriba la pregunta</Label>
          <Input type="text" id="Text"/> 
        </FormGroup>
        <FormGroup>
          <Label>Cantidad de caracteres</Label>
          <Input type="text" id="Cant"/> 
        </FormGroup>
      </ModalBody>

      <ModalFooter>
          <Button color="primary">Guardar</Button>
          <Button color="secondary" onClick={this.abrirModal}>Cancelar</Button>
      </ModalFooter>
    </Modal>
    
    <Modal id='Pregunta Compleja' isOpen={this.state.abierto} style={modalStyles}>
      <ModalHeader>
      Pregunta Compleja
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Escriba la pregunta</Label>
          <Input type="text" id="Text"/> 
        </FormGroup>
      </ModalBody>

      <ModalFooter>
          <Button color="primary">Guardar</Button>
          <Button color="secondary" onClick={this.abrirModal}>Cancelar</Button>
      </ModalFooter>
    </Modal>



    </>
     )
  }
}



export default AddElement





