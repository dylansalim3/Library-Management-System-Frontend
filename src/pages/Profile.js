import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import jwt_decode from 'jwt-decode';
import '../style/Style.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

const DarkDisabledTextField = withStyles({
  root: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.8)', // (default alpha is 0.38)
    },
  },
})(TextField);

const DarkerDisabledTextField = withStyles({
  root: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.6)', // (default alpha is 0.38)
    },
  },
})(TextField);

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      role: null,
      userid: '',
      dialog: false,
      editing: false,
    };
  }

  getProfile = (userid) =>{
        axios.post('/users/profile', {
            userid: userid
        })
        .then(res=>{
            console.log(res.data.userdata[0].first_name);
            this.setState({
              first_name: res.data.userdata[0].first_name,
              last_name: res.data.userdata[0].last_name,
            });
        })
  }

  updateProfile = () =>{
      axios.post('/users/updateprofile',{
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          userid: this.state.userid
      })
      .then(res=>{
          console.log(res);
      });
      this.setState({
          editing: false,
          dialog:true
      })
  }



  componentDidMount() {
    if (localStorage.usertoken) {
      var token = localStorage.usertoken;
      var decoded = jwt_decode(token);
      console.log(decoded.id);
      this.setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
        role: decoded.role,
        userid: decoded.id,
        
      });
      this.getProfile(decoded.id);
      console.log('my role is ' + decoded.role);
    } else {
      this.props.history.push('/');
      console.log('you are not logged in');
    }
  }

    onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Sidebar
          role={this.state.role}
          user={this.state.first_name}
          selected="profile"
        />
        <div
          className="content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1>Profile</h1>
          <DarkerDisabledTextField
            disabled
            label="Role"
            variant="outlined"
            name="role"
            value={this.state.role}
            className=" profileInput gridmargin"
          />
          <DarkerDisabledTextField
            disabled
            label="Library ID"
            variant="outlined"
            name="userid"
            value={this.state.userid}
            onChange={this.onChange}
            className="profileInput gridmargin"
          />
          <DarkerDisabledTextField
            disabled={!this.state.editing}
            label="First Name"
            variant="outlined"
            name="first_name"
            value={this.state.first_name}
            onChange={this.onChange}
            className="profileInput gridmargin"
          />
          <DarkerDisabledTextField
            disabled={!this.state.editing}
            label="Last Name"
            variant="outlined"
            name="last_name"
            value={this.state.last_name}
            onChange={this.onChange}
            className="profileInput gridmargin"
          />
          <DarkerDisabledTextField
            disabled
            label="Email Address"
            variant="outlined"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            className="profileInput gridmargin"
          />

          <div
            style={{
              marginTop: '50px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              disabled={this.state.editing}
              variant="contained"
              onClick={() => this.setState({ editing: true })}
              style={{ width: '40%', maxWidth: '230px', height: '40px' }}
            >
              Edit
            </Button>
            <Button
              disabled={!this.state.editing}
              variant="contained"
              onClick={() => this.updateProfile()}
              style={{
                backgroundColor: '#2B8C96',
                marginLeft: '20px',
                width: '40%',
                maxWidth: '230px',
                height: '40px',
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.dialog}
          autoHideDuration={6000}
          onClose={() => this.setState({ dialog: false })}
          message="Profile saved"
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
      </div>
    );
  }
}
