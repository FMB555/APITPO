import React /*, {Component}*/ from 'react';

const PreguntaSimple = ({nombre, len}) => {
    return (
      <div className='card'>
        <h1> {nombre} </h1>
        <input type = 'text' maxLength = {len}/>
      </div>
    )
}

/*class PreguntaSimple extends Component {
  constructor(props) {
    super(props);
    this.name = props.titulo;
    this.cant = props.cant;
  }

  render() {
    return(
      <div className='card'>
        <h1>{this.name}</h1>
        <input type='text' maxLength={this.cant} /> 
      </div>
    )
  }
}*/


export default PreguntaSimple;