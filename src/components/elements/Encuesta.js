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
                    <PreguntaSimple nombre='Pregunta Simple' len='10'/>
                    <PreguntaCompleja nombre='Pregunta Compleja'/>
                    <SeleccionUnica nombre='Selección única' lista={['Respuesta 1', 'Respuesta 2']}/>
                    <Multiple nombre='Selección múltiple' lista={['Respuesta 1', 'Respuesta 2']}/>
                    <Archivo nombre='Subida de archivos'/>
                    <Button>Guardar</Button>
                </div>
                
            </React.Fragment>
        )
    }
}

export default Encuesta;