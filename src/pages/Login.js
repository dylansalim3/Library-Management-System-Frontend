import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      role: 'admin',
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
          console.log('Error : ' + res.data.error);
        } else {
          console.log(res.data.token);
          localStorage.setItem('usertoken', res.data.token);
          console.log('Successfully logging in');
          console.log(this.state.role);
          if (this.state.role === 'admin') {
            this.props.history.push('/admindashboard');
          } else if (
            this.state.role === 'student' ||
            this.state.role === 'teacher'
          ) {
            this.props.history.push('/studentdashboard');
          }else if(this.state.role === 'librarian'){
            this.props.history.push('/librarian-dashboard');
          }
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <Grid
        container
        spacing={1}
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Sign in</h1>
        <form onSubmit={this.onSubmit}>
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />

          <div style={{ marginTop: '15px' }}>
            <TextField
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
              style={{ width: '195px' }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="librarian">Librarian</MenuItem>
            </TextField>
          </Grid>

          <div style={{ marginTop: '15px' }}>
            <Button
              style={{ width: '195px' }}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Grid>
    );
  }
}

export default Login;
