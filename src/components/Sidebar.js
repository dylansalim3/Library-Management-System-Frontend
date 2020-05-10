import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Link, withRouter } from 'react-router-dom';
import {topgreen} from './Color';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  console.log(props.role);
  console.log(props.selected);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.removeItem('usertoken');
    props.history.push('/');
  };


  const style = {
    color: 'white',
  };

  const adminmenuArray = [
    { name: 'Dashboard', route: 'admindashboard' },
    { name: 'Add book', route: 'add_book' },
    { name: 'Edit/Delete book', route: 'edit_book' },
    { name: 'Borrow/Return/Renew', route: 'borrowbook' },
    { name: 'Book Reservation', route: 'reservebook' },
  ];

  const studentmenuArray = [
    { name: 'Dashboard', route: 'studentdashboard' },
    { name: 'Search book', route: 'searchbook' },
    { name: 'Pending Reservation', route: 'reservation' },
    { name: 'Borrow History', route: 'borrowhistory' },
    { name: 'Extend Borrow', route: 'extendborrow' },
  ];

  const teachermenuArray = [
    { name: 'Dashboard', route: 'studentdashboard' },
    { name: 'Search book', route: 'searchbook' },
    { name: 'Pending Reservation', route: 'reservation' },
    { name: 'Borrow History', route: 'borrowhistory' },
    { name: 'Extend Borrow', route: 'extendborrow' },
    { name: 'Student Registration', route: 'studentregistration' },

  ];

  const returnMenus = (role) => {
    var arr = [];
    if (role === 'admin') {
      arr = adminmenuArray;
    } else if (role === 'student') {
      arr = studentmenuArray;
    }else if(role === 'teacher'){
      arr = teachermenuArray;
    }

    return (
      <div>
        {arr.map((data, index) => (
          <ListItem
            button
            key={data.name}
            component={Link}
            to={`/${data.route}`}
            style={{
              ...style,
              ...{
                backgroundColor:
                  props.selected === data.route ? '#2F8C97' : '#339CA8',
              },
            }}
          >
            <ListItemText primary={data.name} />
          </ListItem>
        ))}
        <ListItem
          style={{
            ...style,
            ...{
              position: 'fixed',
              bottom: 10,
              backgroundColor: 'red',
              width: '200px',
              color:'black',
              marginLeft: 20

            },
          }}
          button
          onClick={logout}
        >
          <ListItemText primary="logout" />
        </ListItem>
      </div>
    );
  };

  const drawer = (
    <div style={{ backgroundColor: '#339CA8', height: '100%' }}>
      <div className={classes.toolbar}>
        <h2>E-library</h2>
      </div>
      <Divider />

      <List>{returnMenus(props.role)}</List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" style={{backgroundColor:topgreen}}className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
         <div className={classes.toolbar} /> 
      </main>
    </div>
            
    </div>
  );
}

export default withRouter(Sidebar);
