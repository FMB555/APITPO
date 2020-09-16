import React, { Component } from 'react'
import PreguntaSimple from './PreguntaSimple'
import PreguntaCompleja from './PreguntaCompleja'
import SeleccionUnica from './SeleccionUnica'
import Multiple from './Multiple'
import Archivo from './Archivo'
import Button from '@material-ui/core/Button';

class Encuesta extends Component {


    mostrarPregunta = () => {

        const preguntas = this.props.preguntas;

        return (
            <React.Fragment>
                <div>
                    <h2>
                        Encuesta
                    </h2>
                    <Button>Guardar</Button>
                </div>
            </React.Fragment>
        )

    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h2>
                        Encuesta
                    </h2>
                    <PreguntaSimple nombre='Fran' len='1'/>
                    <SeleccionUnica/>
                    <PreguntaCompleja nombre='Pregunta'/>
                    <Multiple/>
                    <Archivo/>
                    <Button>Guardar</Button>
                </div>
                
            </React.Fragment>
        )
    }
       



}

export default Encuesta;