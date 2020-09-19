import React from 'react';
//import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

/*Tareas:
1) Remplazar:  <h1> Pregunta Simple </h1> Por el parametro nombre
2) Definir parametros como nombre y cantidad de opciones con las opciones
*/

/*<FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />*/
/*
<FormControlLabel value="Macho" control={<Radio />} label="Macho" />
<FormControlLabel value="Macho Pecho Peludo" control={<Radio />} label="Macho Pecho Peludo" />
<FormControlLabel value="Jugador de Rugby" control={<Radio />} label="Jugador de Rugby" />
No resultó necesario len
*/

const SeleccionUnica = ({nombre, lista}) => {
    return (
      <div className='card'>
        <h3> {nombre} </h3>
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1">
                {lista.map((answer) => <FormControlLabel value={answer} control={<Radio />} label={answer}/>)}
            </RadioGroup>
        </FormControl>

      </div>
    )
}


export default SeleccionUnica;
