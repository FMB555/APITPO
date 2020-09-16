import React from 'react';

 

/*Remplazar:  <h1> Pregunta Simple </h1>
Por el parametro nombre*/




const PreguntaSimple = ({nombre, len}) => {
    return (
      <div className='card'>
        <h1> {nombre} </h1>
        <input type = 'text' maxLength = {len}/>
      </div>
    )
}


export default PreguntaSimple;