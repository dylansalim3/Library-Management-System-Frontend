import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import jwt_decode from 'jwt-decode';
import '../../style/Style.css';

export default class Admindashboard extends Component {
  
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      role: null,
    };
  }

  componentDidMount() {
    if (localStorage.usertoken) {
      var token = localStorage.usertoken;
      var decoded = jwt_decode(token);
      this.setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
        role: decoded.role,
      });
      console.log("my role is "+ decoded.role);
      if(decoded.role==="student"||decoded.role==="teacher"){
        this.props.history.push('/studentdashboard'); //push to teacher dashboard and student dashboard 
        console.log("Students and teachers are not allowed to access this page.");
      }
    } else {
      this.props.history.push('/');
      console.log('you are not logged in');
    }
  }

  render() {
    return (
      <div>
        <Sidebar role={this.state.role} user={this.state.first_name} email={this.state.email} selected="admindashboard" />
        <div className="content">
          <h1>this is dashboard for admin and librarian</h1>
        </div>
      </div>
    );
  }
}
