import React, {Component} from 'react';
import {
  SnackbarContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  root: {
    background: 'red',
  },
};

class BookReservationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: Date.now(),
          endDate: new Date(
            new Date(Date.now()).getTime() + 1000 * 60 * 60 * 24
          ),
          reason: '',
          showAlertModal: false,
          formValidation: {
            error: false,
            endDate: '',
            reason: '',
          },
          userId: null,
          modalOpen: this.props.openModal,
          snackDialog: false,
          snackMessage: '',
          snackColor: '',
        };
    }

    componentDidMount() {
        var token = localStorage.usertoken;
        if (token !== undefined) {
            var decoded = jwt_decode(token);
            this.setState({
                userId: decoded.id
            })
        }
    }

    onCloseModal = () => {
        this.props.onChangeShowBookReservationModal();
        // this.props.openModal = false;
    };

    onChangeForm = (name, value) => {
        const reasonEmptyError = false;
        if (name === 'reason' && value === '') {
            this.reasonEmptyError = true;
        }
        this.setState({
            formValidation: {
                error: this.reasonEmptyError,
                reason: this.reasonEmptyError ? 'Empty Field' : '',
            }
        });

        this.setState({
            [name]: value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.validFormFields()) {
            this.setState({
                showAlertModal: true,
            });
        }
    };

    validFormFields = () => {
        if (this.state.reason === '') {
            this.setState({
                formValidation: {
                    error: true,
                    reason: 'Empty Field',
                }
            });
            return false;
        }
        return true;
    };

    onCloseConfirmationModal = () => {
        this.setState({
            showAlertModal: false,
        });
    };

    submitReservation = async() => {
        console.log('submit to backend');
        console.log(this.props.selectedbook);
        console.log(this.state.userId);
        console.log(this.state.reason);
        await axios
            .post('book-request/add-reserve-book-request', {
                userId: this.state.userId,
                bookId: this.props.selectedbook,
                reason: this.state.reason,
            })
            .then((results) => {
                this.setState({
                    snackMessage: 'Book reservation request sent.',
                    snackColor: 'green',
                    snackDialog: true
                })
                console.log(results.data);
            })
            .catch(e => {
                this.setState({
                  snackMessage:
                    'Selected book is not available for reservation.',
                  snackColor: 'red',
                  snackDialog: true,
                });
                console.log(e);
            });
            this.onCloseModal();
            this.onCloseConfirmationModal();
    };

    render() {
        const { classes } = this.props;

        return (
          <div>
            <Dialog
              open={this.props.openModal}
              onClose={() => this.onCloseModal()}
              scroll="body"
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              fullWidth
            >
              <DialogTitle id="scroll-dialog-title" className="textCenter">
                Book Reservation
              </DialogTitle>
              <DialogContent dividers>
                <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className="flex-justify-center">
                      <KeyboardDatePicker
                        maxDate={
                          new Date(
                            new Date(this.state.endDate).getTime() -
                              1000 * 60 * 60 * 24
                          )
                        }
                        disablePast
                        disableToolbar
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Start Date"
                        value={this.state.startDate}
                        onChange={(e, value) =>
                          this.onChangeForm('startDate', e)
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </div>
                    <div className="flex-justify-center">
                      <KeyboardDatePicker
                        minDate={
                          new Date(
                            new Date(this.state.startDate).getTime() +
                              1000 * 60 * 60 * 24
                          )
                        }
                        disablePast
                        disableToolbar
                        variant="inline"
                        format="dd-MM-yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="End Date"
                        value={this.state.endDate}
                        onChange={(e, value) => this.onChangeForm('endDate', e)}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </div>

                    <Grid container direction="row" justify="center">
                      <Grid item md={5}>
                        <TextField
                          error={
                            this.state.formValidation.error &&
                            this.state.formValidation.reason !== ''
                          }
                          helperText={this.state.formValidation.reason}
                          fullWidth
                          required
                          label="Reason for Reservation"
                          variant="outlined"
                          name="reason"
                          onChange={(e) =>
                            this.onChangeForm(e.target.name, e.target.value)
                          }
                          multiline
                          rows={10}
                          rowsMax={10}
                        />
                      </Grid>
                    </Grid>
                    <div
                      style={{ marginTop: 10 }}
                      className="flex-justify-center"
                    >
                      <Button variant="contained" type="submit" color="primary">
                        Submit
                      </Button>
                    </div>
                  </MuiPickersUtilsProvider>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog
              open={this.state.showAlertModal}
              onClose={this.onCloseConfirmationModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle>
                Are you sure you want to make reservation?
              </DialogTitle>
              <DialogContent>
                Once submitted the process cannot be undone. Reservation will
                take 1-3 days
              </DialogContent>
              <DialogActions>
                <Button onClick={this.onCloseConfirmationModal} color="primary">
                  Go Back
                </Button>
                <Button
                  onClick={() => this.submitReservation()}
                  color="primary"
                  autoFocus
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.snackDialog}
              autoHideDuration={4000}
              onClose={() => this.setState({ snackDialog: false })}
            >
              <SnackbarContent
                style={{
                  backgroundColor: this.state.snackColor,
                }}
                message={this.state.snackMessage}
                action={
                  <React.Fragment>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={() => this.setState({ snackDialog: false })}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              />
            </Snackbar>
          </div>
        );
    }
}

export default BookReservationModal;