import React, { Component } from 'react';
import axios from 'axios';

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
          console.log("Error : " + res.data.error);
        } 
        else {
          console.log(res.data.token);
          localStorage.setItem('usertoken', res.data.token);
          console.log('Successfully logging in');
          console.log(this.state.role);
          if(this.state.role==="admin"){
            this.props.history.push('/admindashboard');
          }else if(this.state.role==="student"||this.state.role==="teacher"){
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
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  className="form-control"
                  name="role"
                  value={this.state.role}
                  onChange={this.onChange}
                >
                  <option value="admin">Admin</option>
                  <option value="student">
                    Student
                  </option>
                  <option value="teacher">Teacher</option>
                  <option value="librarian">Librarian</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
