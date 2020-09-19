import React from 'react';
import TextField from '@material-ui/core/TextField';

const PreguntaCompleja = ({nombre}) => {
    return (
      <div className='card'>
        <h1> {nombre} </h1>
        <TextField/>
      </div>
    )
}


export default PreguntaCompleja;