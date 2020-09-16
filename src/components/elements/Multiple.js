import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';


/*Tareas:

1) Remplazar:  <h1> Pregunta Simple </h1> Por el parametro nombre

2) Definir parametros como nombre y cantidad de opciones con las opciones
*/

/*<FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />*/

const Multiple = (nombre) => {
    return (
      <div className='card'>
        <h1> SeleccionUnica </h1>
            <FormControl component="fieldset" >
                        <FormGroup>
                            <FormControlLabel
                            control={<Checkbox/>}
                            label="Francisco"
                            />
                            <FormControlLabel
                            control={<Checkbox/>}
                            label="Maria"
                            />
                            <FormControlLabel
                            control={<Checkbox/>}
                            label="Bourse"
                            />
                        </FormGroup>
                    
            </FormControl>

      </div>
    )
}


export default Multiple;

