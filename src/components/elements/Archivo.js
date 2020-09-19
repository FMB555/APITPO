import React from 'react';

const Archivo = ({nombre}) => {
    return (
      <div className='card'>
        <h1>{nombre}</h1>
        <input type = 'file'/>
      </div>
    )
}


export default Archivo;