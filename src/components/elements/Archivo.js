import React from 'react';

 

/*Remplazar:  <h1> Pregunta Simple </h1>
Por el parametro nombre*/




const Archivo = (nombre, len) => {
    return (
      <div className='card'>
        <h1> Carga de Archivo </h1>
        <input type = 'file'/>
      </div>
    )
}


export default Archivo;