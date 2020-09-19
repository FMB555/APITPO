import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AlarmIcon from '@material-ui/icons/Alarm';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import CreateIcon from '@material-ui/icons/Create';


class Nav extends React.Component{
    render(){
        return(
            <BottomNavigation>
                <BottomNavigationAction label="Create" value="Create" icon={<CreateIcon />} />
                <BottomNavigationAction label="Alarm" value="Alarm" icon={<AlarmIcon />} />
                <BottomNavigationAction label="Eliminar" value="Eliminar" icon={<DeleteIcon />} />
                <BottomNavigationAction label="Folder" value="Folder" icon={<FolderIcon />} />
            </BottomNavigation>
        )
    }
}


export default Nav;