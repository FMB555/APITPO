import React from 'react';

//Reactstrap imports.
import { Modal, ModalHeader, ModalBody, ModalFooter,
         FormGroup, Input, Label } from 'reactstrap';

//Material UI Core imports.
import { Select, MenuItem, Drawer, InputLabel, FormControl, Button,
        TextField, Typography, Paper, AppBar, Toolbar, withStyles,
        IconButton, List, ListItem, ListItemIcon, ListItemText, Divider, 
        Switch, FormControlLabel } from '@material-ui/core';

//Material UI Icons imports.
import { ChevronRight, ChevronLeft, /*ExitToApp,*/ ShortText,
         Subject, CheckBox, RadioButtonChecked, Description,
         Delete, DoneAll, LooksOne, LinearScale,
         Email, AddToPhotos, FormatListNumbered, ScatterPlot } from '@material-ui/icons';

import clsx from 'clsx';

const drawerWidth = 300;
const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: "#009AA6",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 55,
    minWidth: '60%'
  },
});

class Encuesta extends React.Component {

  /*
    Pregunta simple: ['short_text', pregunta, cantidad, obligatorio]
    Pregunta compleja: ['long_text', pregunta, obligatorio]
    Pregunta de seleccion multiple: ['check', pregunta, opciones..., obligatorio]
    Pregunta de seleccion unica: ['radio', pregunta, opciones..., obligatorio]
    Pregunta de archivo: ['file', pregunta, archivo, obligatorio]
    Pregunta verdadero/falso: ['true_false', pregunta, opciones..., obligatorio]
    Pregunta numerica: ['number', pregunta, obligatorio]
    Pregunta de rango: ['range_number', pregunta, min, max, obligatorio]
    Pregunta de mail: ['email', pregunta, obligatorio]
    Pregunta de carga de imagen: ['img', 'png', 'jpeg', oligatorio] 
    Pregunta de calificación: ['calificacion', pregunta, min, max, obligatorio]
    Pregunta de selección: ['select', pregunta, opciones..., obligatorio]
  */
 
 /*
   encuestas = [titulo, desc, [preg1], [preg2],...]
 */

state={
    encuestas: ['Título del formulario', 'Descripción'],
    shown: [false, false],
    formName:'Encuesta sin nombre',
    description: 'Descripcion',
    active:'',
    answersAmount:1,
    min:1,
    max:2,
    question:'',
    drawerOpen:false,
  }

  questionType = ''
  docType = ''
  answersList = []

  preguntaSimple = (text, car) =>{
    this.setState({
      encuestas: this.state.encuestas.concat([[this.questionType, text, car, false]]),
      shown: this.state.shown.concat([false])
    });
    this.cerrarModal()
  }

  preguntaCompleja = (text) =>{
    /* Compleja, numérica, email, carga de imagen */
    this.setState({
      encuestas: this.state.encuestas.concat([[this.questionType, text, false]]),
      shown: this.state.shown.concat([false])
    })
    this.cerrarModal()
  }

  preguntaArchivo = (text) => {
    this.setState({
      encuestas: this.state.encuestas.concat([[this.questionType, text, this.docType, false]]),
      shown: this.state.shown.concat([false])
    })
    this.cerrarModal()
  }

  opcionMultiple = (text, ans) => {
    /* multiple, unica, select, true/false */
    let add = [this.questionType, text]
    for (let i = 0; i < ans.length; i++) {
      add.push(ans[i]);
    }
    add.push(false)
    this.setState({
      encuestas: this.state.encuestas.concat([add]),
      shown: this.state.shown.concat([false])
    })
    this.cerrarModal()
  }

  preguntaRango = (text) => {
    /* rango, calificación */
    this.setState({
      encuestas: this.state.encuestas.concat([[this.questionType, text, this.state.min, this.state.max, false]]),
      shown: this.state.shown.concat([false])
    })
    this.cerrarModal()
  }

  abrirModal = (id) => {
    this.setState({active: id});
  }
  
  cerrarModal = () => {
    this.setState({active: ''});
  }

  changeAnswers = (cant) => {
    this.setState({answersAmount: cant.target.value})
  }

  createInputs = (cant) => {
    let lista = [];
    for (let i = 0; i < cant; i++) {
      let number = "Opcion " + (i+1).toString() + ":";
      lista.push(<Label key={"Ans" + i}>{number}</Label>);
      lista.push(<TextField key={"ANSWERS" + i} placeholder="Respuesta" multiline fullWidth onBlur={(resp) => this.answersList.push(resp.target.value)} />);
    }
    return lista;
  }

  createEncuestas = () => {
    let resultado = [];
    let add = [];
    for (let i = 2; i < this.state.encuestas.length; i++) {
      for (let j = 1; j < (this.state.encuestas[i].length - 1); j++) {
        add.push(this.state.encuestas[i][j])
      }
      console.log(this.state.encuestas)
      console.log(this.state.encuestas[i])
      let preg = this.state.encuestas[i]
      let paper = <Paper elevation={3} onMouseEnter={() => this.showButtons(preg, true)} onMouseLeave={() => this.showButtons(preg, false)}>
          <p style={{verticalAlign:'top', textAlign:'right'}}>{this.state.encuestas.indexOf(preg) - 1}</p>
          {add.map(k => {return <p>{k}</p>})}
          { this.findShown(preg) ?
            <div>
              <IconButton>
                <Delete onClick={() => this.removeQuestion(preg)}/>
              </IconButton>
              <FormControlLabel control={<Switch checked={this.state.encuestas[i][this.state.encuestas[i].length - 1]}
                onClick={() => this.changeOblig(preg)} color="primary" />} label="Obligatorio" />
            </div>
           : null }
        </Paper>
      resultado.push(paper)
      add = []
    }
    return resultado
  }

  changeOblig = (i) => {
    let pos = this.state.encuestas.indexOf(i)
    let j = this.state.encuestas[pos].length - 1;
    console.log(pos, this.state.encuestas[pos][j]);
    let enc = this.state.encuestas;
    enc[pos][j] = enc[pos][j] ? false : true;
    this.setState({encuestas: enc});
    console.log(pos, this.state.encuestas[pos][j]);
  }

  changeFormName = (name) => {
    this.setState({ formName: name });
  }

  changeFormDescription = (desc) => {
      this.setState({ description: desc });
  }

  addAnswer = (answer) => {
    this.answersList.push(answer);
  }

  resetAnswers = () => {
    this.answersList = [];
  }

  handleDocChange = (event) => {
    this.docType = event.target.value;
  }

  changeQuestion = (newQuestion) => {
    this.setState({
      question: newQuestion.target.value,
    })
  }

  removeQuestion = (find) => {
    const index = this.state.encuestas.indexOf(find);
    console.log(index);
    this.setState({encuestas: this.state.encuestas.filter(x => x !== find)})
  }

  changeMin = (newMin) => {
    this.setState({
      min: newMin.target.value,
    })
  }

  changeMax = (newMax) => {
    this.setState({
      max: newMax.target.value,
    })
  }

  showButtons = (preg, show) => {
    let pos = this.state.encuestas.indexOf(preg)
    let len = this.state.encuestas[pos].length - 1
    let copy = [...this.state.shown]
    let change = {...copy[pos]}
    change[len] = show
    copy[pos] = change
    this.setState({ shown: copy })
  };

  findShown = (preg) => {
    let pos = this.state.encuestas.indexOf(preg)
    let len = this.state.encuestas[pos].length -1
    return this.state.shown[pos][len]
  }

  
  /*
  const paperStyles = {
    maxWidth: '50%',
    margin: 'auto',
  }
  */

  render() {
    const { classes } = this.props;
    

    const titleStyles = {
      maxWidth: '50%',
      margin: 'auto',
    }

    const modalStyles={
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: "block",
    }

    const buttonStyles={
      margin: '5px',
      backgroundColor: "#009AA6",
      color: "#FFFFFF",
      "&:hover": {
          backgroundColor: "#00818a",
          color: "#FFFFFF",
      },
    }

    const formControlStyles={
      minWidth: 120,
    }
    const handleDrawer = () => {
      console.log(!this.state.drawerOpen);
      this.setState({drawerOpen: !this.state.drawerOpen});
    }

    return(
      <>
        <div className={classes.root}>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.drawerOpen,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                className= {clsx(classes.menuButton, {
                  [classes.hide]: this.state.drawerOpen,
                })}
              >
                <ChevronRight />
              </IconButton>
              <Typography variant="h6" noWrap>
                Crear o modificar encuesta
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: this.state.drawerOpen,
              [classes.drawerClose]: !this.state.drawerOpen,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: this.state.drawerOpen,
                [classes.drawerClose]: !this.state.drawerOpen,
              }),
            }}>
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawer} >
                <ChevronLeft />
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button key="simple" onClick={() => this.abrirModal('simple')}>
                <ListItemIcon> <ShortText /> </ListItemIcon>
                <ListItemText primary="Pregunta simple" />
              </ListItem>
              <ListItem button key="compleja" onClick={() => this.abrirModal('compleja')}>
                <ListItemIcon> <Subject /> </ListItemIcon>
                <ListItemText primary="Pregunta compleja" />
              </ListItem>
              <ListItem button key="multiple" onClick={() => this.abrirModal('multiple')}>
                <ListItemIcon> <CheckBox /> </ListItemIcon>
                <ListItemText primary="Pregunta de seleccion multiple" />
              </ListItem>
              <ListItem button key="unica" onClick={() => this.abrirModal('unica')}>
                <ListItemIcon> <RadioButtonChecked /> </ListItemIcon>
                <ListItemText primary="Pregunta de seleccion unica" />
              </ListItem>
              <ListItem button key="archivo" onClick={() => this.abrirModal('archivo')}>
                <ListItemIcon> <Description /> </ListItemIcon>
                <ListItemText primary="Pregunta de carga de archivo" />
              </ListItem>
              <ListItem button key="true/false" onClick={() => this.abrirModal('true/false')}>
                <ListItemIcon> <DoneAll /> </ListItemIcon>
                <ListItemText primary="Pregunta verdadero/falso" />
              </ListItem>
              <ListItem button key="numerica" onClick={() => this.abrirModal('numerica')}>
                <ListItemIcon> <LooksOne /> </ListItemIcon>
                <ListItemText primary="Pregunta numérica" />
              </ListItem>
              <ListItem button key="rango" onClick={() => this.abrirModal('rango')}>
                <ListItemIcon> <LinearScale /> </ListItemIcon>
                <ListItemText primary="Pregunta de rango" />
              </ListItem>
              <ListItem button key="email" onClick={() => this.abrirModal('email')}>
                <ListItemIcon> <Email /> </ListItemIcon>
                <ListItemText primary="Pregunta de email"/>
              </ListItem>
              <ListItem button key="imagen" onClick={() => this.abrirModal('imagen')}>
                <ListItemIcon> <AddToPhotos /> </ListItemIcon>
                <ListItemText primary="Pregunta de carga de imágen" />
              </ListItem>
              <ListItem button key="calificacion" onClick={() => this.abrirModal('calificacion')}>
                <ListItemIcon> <FormatListNumbered /> </ListItemIcon>
                <ListItemText primary="Pregunta de calificación" />
              </ListItem>
              <ListItem button key="seleccion" onClick={() => this.abrirModal('seleccion')}>
                <ListItemIcon> <ScatterPlot /> </ListItemIcon>
                <ListItemText primary="Pregunta de selección" />
              </ListItem>
            </List>
          </Drawer>

          <div className={classes.content}>
            <Paper elevation={3} style={titleStyles} className={classes.content}>
                <TextField
                  id="title"
                  defaultValue={this.state.encuestas[0]}
                  multiline
                  fullWidth
                  inputProps={{style: {fontSize: 30, paddingTop: 5}}}
                  onBlur={(name) => this.changeFormName(name)}
                />
                <TextField
                  id="descripcion"
                  defaultValue={this.state.encuestas[1]}
                  multiline
                  fullWidth
                  onBlur={(desc) => this.changeFormDescription(desc)}
                />
            </Paper>
            <div className={classes.content} id='ver'>
              {this.createEncuestas(this.encuestas)}
            </div>
            <div>
              <Button style={buttonStyles}>Borrar Pregunta</Button>
              <Button style={buttonStyles}>Guardar</Button>
              <Button style={buttonStyles} >Guardar y Publicar</Button>
              <Button style={buttonStyles} href='/Home'>Volver</Button>
            </div>
          </div>
        </div>

        <Modal id='Pregunta Simple' isOpen={this.state.active === 'simple'} style={modalStyles}>
          <ModalHeader>
              Pregunta Simple
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="PS"
                placeholder="Pregunta"
                multiline
                fullWidth
               />
            </FormGroup>
            <FormGroup>
              <Label>Cantidad de caracteres</Label>
              <Input type="number" id="PSC"/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType = 'short_text'; this.preguntaSimple(document.getElementById('PS').value,document.getElementById('PSC').value)}}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        
        <Modal id='Pregunta Compleja' isOpen={this.state.active === 'compleja'} style={modalStyles}>
          <ModalHeader>
            Pregunta Compleja
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
                <TextField
                  id="PC"
                  placeholder="Pregunta"
                  multiline
                  fullWidth
                />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType= 'long_text'; this.preguntaCompleja(document.getElementById('PC').value)}}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id="Opcion múltipe" isOpen={this.state.active === 'multiple'} style={modalStyles}>
          <ModalHeader>
              Pregunta de opción múltiple
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="MUL"
                placeholder="Pregunta"
                multiline
                fullWidth
                onBlur={(q) => this.changeQuestion(q)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ingrese la cantidad de opciones</Label>
              <Input type="number" id="Cant" value={this.state.answersAmount} onInput={(c) => this.changeAnswers(c)}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={() => {this.questionType = 'check'; this.abrirModal('respuestas')}}>Continuar</Button>
              <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id="Opción única" isOpen={this.state.active === 'unica'} style={modalStyles}>
          <ModalHeader>
              Pregunta de opción única
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="MUL"
                placeholder="Pregunta"
                multiline
                fullWidth
                onBlur={(q) => this.changeQuestion(q)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ingrese la cantidad de opciones</Label>
              <Input type="number" id="Cant" value={this.state.answersAmount} onChange={(c) => this.changeAnswers(c)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={() => {this.questionType = 'radio'; this.abrirModal('respuestas')}} >Continuar</Button>
              <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id="Respuestas" isOpen={this.state.active === 'respuestas'} style={modalStyles}>
          <ModalHeader>
              Escriba las opciones
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              {this.createInputs(this.state.answersAmount).map((answer) => answer)}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.opcionMultiple(this.state.question, this.answersList); this.resetAnswers()}}>
              Guardar
            </Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id="Archivo" isOpen={this.state.active === 'archivo'} style={modalStyles}>
          <ModalHeader>
              Pregunta con carga de archivos
          </ModalHeader>
          <ModalBody>
              <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="ARC"
                placeholder="Pregunta"
                multiline
                fullWidth
              />
              </FormGroup>
              <Label>Seleccione el tipo de documento</Label>
              <p></p>
              <FormControl style={formControlStyles}>
                <InputLabel>Doc</InputLabel>
                <Select id='TYPE' onChange={this.handleDocChange} >
                    <MenuItem value='Word'>Word</MenuItem>
                    <MenuItem value='PDF'>PDF</MenuItem>
                    <MenuItem value='Excel'>Excel</MenuItem>
                </Select>
              </FormControl>
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={() => {this.questionType = 'file'; this.preguntaArchivo(document.getElementById('ARC').value)}}>Guardar</Button>
              <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id='true/false' isOpen={this.state.active === 'true/false'} style={modalStyles}>
          <ModalHeader>
            Pregunta de verdadero o falso
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="TF"
                placeholder="Pregunta"
                multiline
                fullWidth
                onBlur={(q) => this.changeQuestion(q)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ingrese la cantidad de opciones</Label>
              <Input type="number" id="CantOp" value={this.state.answersAmount} onInput={(c) => this.changeAnswers(c)}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType = 'true/false'; this.abrirModal('respuestas')}}>Continuar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id='numerica' isOpen={this.state.active === 'numerica'} style={modalStyles}>
          <ModalHeader>
            Pregunta numérica
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="num"
                placeholder="Pregunta"
                multiline
                fullWidth
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType = 'number'; this.preguntaCompleja(document.getElementById('num').value)}}>Continuar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id='rango' isOpen={this.state.active === 'rango'} style={modalStyles}>
          <ModalHeader>
            Pregunta de rango
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="range"
                placeholder="Pregunta"
                multiline
                fullWidth
              />
            </FormGroup>
            <FormGroup>
              <Label>Valor mínimo:</Label>
              <Input type="number" id="min" defaultValue={this.state.min} onInput={(c) => this.changeMin(c)}/>
            </FormGroup>
            <FormGroup>
              <Label>Valor máximo:</Label>
              <Input type="number" id="max" defaultValue={this.state.max} onInput={(c) => this.changeMax(c)}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType= 'range'; this.preguntaRango(document.getElementById('range').value)}}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id='email' isOpen={this.state.active === 'email'} style={modalStyles}>
          <ModalHeader>
            Pregunta de email
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="emailPreg"
                placeholder="Pregunta"
                multiline
                fullWidth
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType= 'email'; this.preguntaCompleja(document.getElementById('emailPreg').value)}}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id='imagen' isOpen={this.state.active === 'imagen'} style={modalStyles}>
          <ModalHeader>
            Pregunta de carga de imagen
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="imagenPreg"
                placeholder="Pregunta"
                multiline
                fullWidth
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType= 'imagen'; this.preguntaCompleja(document.getElementById('imagenPreg').value)}}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id='calificacion' isOpen={this.state.active === 'calificacion'} style={modalStyles}>
          <ModalHeader>
            Pregunta de calificación
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="rangeCal"
                placeholder="Pregunta"
                multiline
                fullWidth
              />
            </FormGroup>
            <FormGroup>
              <Label>Valor mínimo:</Label>
              <Input type="number" id="min" value={this.state.min} onInput={(c) => this.changeMin(c)}/>
            </FormGroup>
            <FormGroup>
              <Label>Valor máximo:</Label>
              <Input type="number" id="max" value={this.state.max} onInput={(c) => this.changeMax(c)}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType= 'calificacion'; this.preguntaRango(document.getElementById('rangeCal').value)}}>Guardar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal id='seleccion' isOpen={this.state.active === 'seleccion'} style={modalStyles}>
          <ModalHeader>
            Pregunta de selección
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Escriba la pregunta</Label>
              <TextField
                id="TF"
                placeholder="Pregunta"
                multiline
                fullWidth
                onBlur={(q) => this.changeQuestion(q)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ingrese la cantidad de opciones</Label>
              <Input type="number" id="CantOp" value={this.state.answersAmount} onInput={(c) => this.changeAnswers(c)}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => {this.questionType = 'select'; this.abrirModal('respuestas')}}>Continuar</Button>
            <Button color="secondary" onClick={() => this.cerrarModal()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
    </>
     )
  }
}

export default withStyles(styles)(Encuesta);