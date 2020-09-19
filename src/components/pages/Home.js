import React from 'react';
import Nav from '../elements/Nav'
import AddElement from '../elements/AddElement'
import Encuesta from '../elements/Encuesta'


export default function Home() {
    //Tarea Jime: Generar una coleccion que guarde un componente y un string
 

    return (
        <div className="app container">
            <div className="jumbotron">
                <h1>Título</h1>
            </div>
            <Nav />
            <div className="jumbotron">
                <h3>Agregar...</h3>
                <AddElement />
               
            </div>
            <div className="jumbotron">
                <Encuesta/>
            </div>
        </div>
        
        
        
    )
}