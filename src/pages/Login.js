import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { topgreen, drawergreen } from '../style/Color';
import logo from '../images/mainlogo.png';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: topgreen,
    },
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      role: 'student',
      dialog: false,
      errormessage: '',
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.login();
  };

  login() {
    axios
        .post('users/loginwithrole', {
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
        })
        .then((res) => {
          if (res.data.error) {
            this.setState({
              errormessage: res.data.error,
              dialog: true
            })
            console.log('Error : ' + res.data.error);
          } else {
            console.log(res.data.token);
            localStorage.setItem('usertoken', res.data.token);
            console.log('Successfully logging in');
            console.log(this.state.role);
            if (this.state.role === 'admin' || this.state.role === 'librarian') {
              this.props.history.push('/admindashboard');
            } else if (
                this.state.role === 'student' ||
                this.state.role === 'teacher'
            ) {
              this.props.history.push('/studentdashboard');
            }
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
  }

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <Grid
              container
              spacing={1}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#F1F1F1',
                height: '100vh',
              }}
          >
            <img src={logo} alt="e-library logo" />
            <h1 style={{ color: topgreen }}>User Login</h1>
            <form onSubmit={this.onSubmit}>
              <TextField
                  style={{ width: '250px'}}
                  id="outlined-basic"
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
              />

              <div style={{ marginTop: '15px' }}>
                <TextField
                    style={{ width: '250px' }}
                    type="password"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                />
              </div>
              <Grid item xs={12} style={{ marginTop: '15px' }}>
                <TextField
                    select
                    label="Role"
                    name="role"
                    value={this.state.role}
                    onChange={this.onChange}
                    helperText="Please select your user role"
                    variant="outlined"
                    style={{ width: '250px' }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                  <MenuItem value="librarian">Librarian</MenuItem>
                </TextField>
              </Grid>

              <div style={{ marginTop: '15px' }}>
                <Button
                    style={{ width: '250px' }}
                    type="submit"
                    variant="outlined"
                    color="primary"
                >
                  Sign In
                </Button>
              </div>
            </form>

            <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.dialog}
                autoHideDuration={6000}
                onClose={() => this.setState({ dialog: false })}
                message={this.state.errormessage}
                action={
                  <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() => this.setState({ dialog: false })}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
            />
          </Grid>
        </MuiThemeProvider>
    );
  }
}

export default Login;