import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import jwt_decode from 'jwt-decode';

export default class Studentdashboard extends Component {
  constructor() {
    super();
    this.state = {
      role: null,
    };
  }

  componentDidMount() {
    if (localStorage.usertoken) {
      var token = localStorage.usertoken;
      var decoded = jwt_decode(token);
      this.setState({
        role: decoded.role,
      });
      console.log('my role is ' + decoded.role);
      if (decoded.role === 'admin' || decoded.role === 'librarian') {
        this.props.history.push('/admindashboard'); //push to admin dashboard and librarian dashboard 
        console.log(
          'Only students and teachers are allowed to access this page.'
        );
      }
    } else {
      this.props.history.push('/');
      console.log('you are not logged in');
    }
  }

  render() {
    return (
      <div>
        <Sidebar role={this.state.role} selected="studentdashboard" />
        <h1>this is dashboard for students and teachers</h1>
      </div>
    );
  }
}
