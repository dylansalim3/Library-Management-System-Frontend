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
import { topgreen, drawergreen } from '../style/Color';

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
  overrides: {
    MuiContainer: {
      maxWidth: false,
    },
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
    } else if (role === 'teacher') {
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
                  props.selected === data.route ? topgreen : drawergreen,
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
              backgroundColor: 'white',
              width: '200px',
              color: 'black',
              marginLeft: 20,
              textAlign: 'center',
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
    <div style={{ backgroundColor: drawergreen, height: '100%' }}>
      <div
        className={classes.toolbar}
        style={{
          backgroundColor: topgreen,
          paddingLeft: '20px',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <h2 style={{ color: 'white' }}>E-library</h2>
      </div>
      <Divider />

      <List style={{ marginTop: '30px' }}>{returnMenus(props.role)}</List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar
            style={{
              backgroundColor: topgreen,
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Hidden smDown>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                  <Typography variant="h6" noWrap>
                    Hi,John
                  </Typography>
              </div>
            </Hidden>
            <Hidden mdUp>
              <div
                style={{
                  width: '100%',
                  paddingRight: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                  <Typography variant="h6" noWrap>
                    E-library
                  </Typography>
              </div>
            </Hidden>
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
        <div>
          <div className={classes.toolbar} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Sidebar);
