import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer,
         TableHead, TablePagination, TableRow, TableSortLabel,
         Toolbar, Typography, Paper, Checkbox,
         IconButton, Tooltip, FormControlLabel, Switch} from '@material-ui/core';
import { Delete, Check, Close } from '@material-ui/icons';

function createData(nombre, apellido, legajo, mail, admin) {
    return { nombre, apellido, legajo, mail, admin };
  }
  
let rows = [
    createData('Jimena', 'Jakel', 1, 'jimenajakel@gmail.com', true),
    createData('Prueba', 'Dos', 2, 'prueba2@mail.com', false),
    createData('Prueba', 'Tres', 3, 'prueba3@mail.com', true),
    createData('Prueba', 'Cuatro', 4, 'prueba4@mail.com', true),
    createData('Prueba', 'Cinco', 5, 'prueba5@mail.com', true),
    createData('Prueba', 'Seis', 6, 'prueba6@mail.com', false),
    createData('Prueba', 'Siete', 7, 'prueba7@mail.com', true),
    createData('Prueba', 'Ocho', 8, 'prueba8@mail.com', true),
    createData('Prueba', 'Nueve', 9, 'prueba9@mail.com', false),
    createData('Prueba', 'Diez', 10, 'prueba10@mail.com', false),
    createData('Prueba', 'Once', 11,'prueba11@mail.com', false),
    createData('Prueba', 'Doce', 12, 'prueba12@mail.com', true),
    createData('Prueba', 'Trece', 13, 'prueba13@mail.com', false),
];
  
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
});
    return stabilizedThis.map((el) => el[0]);
}
  
const headCells = [
    { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
    { id: 'apellido', numeric: false, disablePadding: false, label: 'Apellido' },
    { id: 'legajo', numeric: true, disablePadding: false, label: 'Legajo' },
    { id: 'mail', numeric: false, disablePadding: false, label: 'Mail' },
    { id: 'admin', numeric: false, disablePadding: false, label: 'Admin?' },
];
  
function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all users' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      padding: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      marginBottom: 10
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '75%',
      margin: 'auto',
      marginBottom: 30,
      borderRadius: 10
    },
    table: {
      maxWidth: '95%',
      margin: 'auto'
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));
  
  export default function EnhancedTable() {
    const classes = useStyles();
    const toolBarStyles = useToolbarStyles()

    const [row, setRow] = React.useState(rows);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = row.map((n) => n.legajo);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    const DeleteUsers = (userList) => {
        let del = []
        for (let i = 0; i < userList.length; i++) {
            del = del.concat([row.find(element => element.legajo === userList[i])])
        }
        let ret = []
        for (let j = 0; j < del.length; j++) {
            ret = row.filter( x => !del.includes(x))
        }
        setSelected([])
        setRow(ret)
      }
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, row.length - page * rowsPerPage);
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
            <Toolbar
                className={clsx(toolBarStyles.root, {
                [toolBarStyles.highlight]: selected.length > 0,
                })}
                style={selected.length === 0 ? { backgroundColor: "#009AA6" } : null}
            >
                {selected.length > 0 ? (
                    <Typography className={toolBarStyles.title} color="inherit" variant="subtitle1" component="div">
                        {selected.length} {selected.length === 1 ? " seleccionado" : " seleccionados"}
                    </Typography>
                    ) : (
                    <Typography className={toolBarStyles.title} style={{ color: "#FFF" }} variant="h5" id="tableTitle" component="h2">
                        Listado
                    </Typography>
                    )}
                {selected.length > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <Delete onClick={() => DeleteUsers(selected)}/>
                        </IconButton>
                    </Tooltip>
                    ) : (
                    null
                )}
            </Toolbar>

            <TableContainer>
                <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={row.length}
                    />
                    <TableBody>
                        {stableSort(row, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const isItemSelected = isSelected(row.legajo);
                            const labelId = `enhanced-table-checkbox-${index}`;
        
                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.legajo)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.name}
                                    selected={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={isItemSelected}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        align='center'
                                    />
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                                    {row.nombre}
                                </TableCell>
                                <TableCell align="center">{row.apellido}</TableCell>
                                <TableCell align="center">{row.legajo}</TableCell>
                                <TableCell align="center">{row.mail}</TableCell>
                                <TableCell align="center">{row.admin ? <Check /> : <Close /> }</TableCell>
                            </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={row.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} color="primary" />}
            label="Denso"
          />
        </Paper>
      </div>
    );
  }