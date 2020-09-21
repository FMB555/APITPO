import React from 'react';
import AppBar from '../elements/AppBar'
import Chart from '../elements/Chart'
import Button from '@material-ui/core/Button';


class Home extends React.Component {

  render() {
      
    
    return(
        <>
            <AppBar/>
            <div className="jumbotron">
                <h1>
                    Encuestas
                </h1>
                <div>
                    <Chart/>
                </div>
                <div>
                    
                    <Button
                    type="root"
                    variant="contained"
                    color="primary"
                    href='/crearEncuesta'
                    >
                    +
                    </Button>
                </div>
            </div>
            
        </>
     )
  }
}

export default Home