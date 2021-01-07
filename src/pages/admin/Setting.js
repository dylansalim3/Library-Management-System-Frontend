import React, { Component } from 'react';
import AdminBoilerplate from './AdminBoilerplate';
import { withStyles,Button, Grid, Paper, TextField } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import axios from 'axios';
import '../../style/Style.css';
import { topgreen } from '../../style/Color';

const DarkerDisabledTextField = withStyles({
  root: {
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'rgba(0, 0, 0, 0.6)', // (default alpha is 0.38)
    },
  },
})(TextField);

const theme = createMuiTheme({
  toggle: {
    thumbOnColor: 'yellow',
    trackOnColor: 'red',
  },
});

export default class Setting extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      dialog: false,
      schoolName: '',
      schoolAddress: '',
      openingHours: '',
      schoolEmail: '',
      schoolBookFine: '',
      bookReservation: false,
      snackMessage: '',
    };
  }

  componentDidMount(){
    this.getSetting();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getSetting = () => {
      axios
        .get('/setting/retrieve')
        .then((res) => {
          const returned = res.data.result[0];
          console.log(returned);
          
          this.setState({
            schoolName: returned.school_name,
            schoolAddress: returned.school_address,
            openingHours: returned.opening_hours,
            schoolEmail: returned.email,
            schoolBookFine: returned.book_fine,
            bookReservation: returned.reservation_function==0?false:true
          });
        });
  }

  updateSetting = () => {
    if (
      this.state.schoolName.length != 0 &&
      this.state.schoolAddress.length != 0 &&
      this.state.openingHours.length != 0 &&
      this.state.schoolEmail.length != 0 &&
      this.state.schoolBookFine.length != 0
    ) {
      axios
        .post('/setting/update', {
          school_name: this.state.schoolName,
          school_address: this.state.schoolAddress,
          opening_hours: this.state.openingHours,
          email: this.state.schoolEmail,
          book_fine: this.state.schoolBookFine,
          reservation_function: this.state.bookReservation == false ? 0 : 1,
        })
        .then((res) => {
          console.log(res);
          this.getSetting();
        });

      this.setState({
        editing: false,
        snackMessage: 'Settings updated.',
        dialog: true,
      });
    } else {
      this.setState({
        snackMessage: 'Settings cannot be empty.',
        dialog: true,
      });
    }

  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AdminBoilerplate page="setting" />
          <div className="content">
            <Paper
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h1>Setting</h1>
              <DarkerDisabledTextField
                disabled={!this.state.editing}
                label="School Name"
                variant="outlined"
                name="schoolName"
                className=" profileInput gridmargin"
                onChange={this.onChange}
                value={this.state.schoolName}
              />
              <DarkerDisabledTextField
                disabled={!this.state.editing}
                multiline
                rows={4}
                label="School Address"
                variant="outlined"
                name="schoolAddress"
                className=" profileInput gridmargin"
                onChange={this.onChange}
                value={this.state.schoolAddress}
              />
              <DarkerDisabledTextField
                disabled={!this.state.editing}
                label="Opening Hours"
                variant="outlined"
                name="openingHours"
                className=" profileInput gridmargin"
                onChange={this.onChange}
                value={this.state.openingHours}
              />
              <DarkerDisabledTextField
                disabled={!this.state.editing}
                label="School Email"
                variant="outlined"
                name="schoolEmail"
                className=" profileInput gridmargin"
                value={this.state.schoolEmail}
                onChange={this.onChange}
              />
              <DarkerDisabledTextField
                disabled={!this.state.editing}
                label="Book fine per day"
                variant="outlined"
                name="schoolBookFine"
                className=" profileInput gridmargin"
                value={this.state.schoolBookFine}
                onChange={this.onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">RM</InputAdornment>
                  ),
                }}
              />
              <div
                className=" profileInput gridmargin"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: '5px',
                }}
              >
                <h3 style={{ color: '#212121' }}>Book reservation function</h3>
                <ToggleButton
                  disabled={!this.state.editing}
                  value="check"
                  selected={this.state.bookReservation}
                  onChange={() => {
                    this.setState({
                      bookReservation: !this.state.bookReservation,
                    });
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                >
                  <CheckIcon />
                </ToggleButton>
              </div>
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
                  onClick={() => this.updateSetting()}
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
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={this.state.dialog}
                autoHideDuration={6000}
                onClose={() => this.setState({ dialog: false })}
                message={this.state.snackMessage}
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
            </Paper>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}