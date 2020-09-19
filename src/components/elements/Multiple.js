import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

const Multiple = ({nombre, lista}) => {
  return (
    <div className='card'>
      <h1> {nombre} </h1>
        <FormControl component="fieldset" >
          <FormGroup>
            {lista.map((answer) => <FormControlLabel control={<Checkbox />} label={answer} />)}
          </FormGroup>          
        </FormControl>
    </div>
  )
}


export default Multiple;
