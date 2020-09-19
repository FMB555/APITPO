import React from 'react';
//import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

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
