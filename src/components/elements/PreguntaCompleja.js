import React from 'react';
import TextField from '@material-ui/core/TextField';
 

/*Remplazar:  <h1> Pregunta Simple </h1>
Por el parametro nombre*/
/*class PreguntaCompleja extends React.Component {
  constructor (name) {
      this.name = name
  }
  render () {
      <div className='card'>
        <h1> {this.name} </h1>
        <TextField/>
      </div>
  }
}*/

const PreguntaCompleja = ({nombre}) => {
    return (
      <div className='card'>
        <h1> {nombre} </h1>
        <TextField/>
      </div>
    )
}


export default PreguntaCompleja;