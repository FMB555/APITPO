import React from 'react';
import Nav from '../elements/Nav'
import AddElement from '../elements/AddElement'
import Encuesta from '../elements/Encuesta'


export default function Home() {
    //Tarea Jime: Generar una coleccion que guarde un componente y un string
 

    return (
        <div className="app container">
            <div className="jumbotron">
                <h1>Main Title to complete</h1>
            </div>
            <Nav />
            <div className="jumbotron">
                <h2>Generar Encuesta</h2>
                <AddElement />
               
            </div>
            <div className="jumbotron">
                <Encuesta/>
            </div>
        </div>
        
        
        
    )
}