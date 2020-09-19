import React from 'react';

const PreguntaSimple = ({nombre, len}) => {
    return (
      <div className='card'>
        <h1> {nombre} </h1>
        <input type = 'text' maxLength = {len}/>
      </div>
    )
}

export default PreguntaSimple;