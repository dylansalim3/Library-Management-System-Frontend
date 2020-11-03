import React, {Component} from 'react';
import {Button, Grid, InputAdornment, TextField} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {Error as ErrorIcon} from '@material-ui/icons';
import axios from 'axios';
import AlertDialog from "../../../components/AlertDialog";
import {isEmpty} from '../../../util/StringUtils'

const ValidationField = props => {
    const {isValid, ...rest} = props;
    const empty = props.value === '';
    const valid = isValid(props.value);
    let startAdornment;
    if (empty) {
        startAdornment = null;
    } else if (!valid) {
        startAdornment = (
            <InputAdornment position="start">
                <ErrorIcon color="error"/>
            </InputAdornment>
        );
    }
    return (
        <TextField
            {...rest}
            error={!empty && !valid}
            InputProps={{startAdornment}}
        />
    );
};

class BorrowBookTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: '',
            userId: '',
            startDate: null,
            endDate: null,
            errorDialog: {
                showErrorDialog: false,
                errorMessage: '',
            },
            successDialog: {
                showSuccessDialog: false,
            }
        };
    }

    onChangeForm = (name, value) => {
        if (isEmpty(value)) {

        }
        this.setState({
            [name]: value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isFormValid()) {
            this.submitBorrowRequest();
        } else {
            this.setState({
                errorDialog: {
                    showErrorDialog: true,
                    errorMessage: "Please fill in all the fields"
                }
            })
        }
    };

    submitBorrowRequest = () => {
        axios.post('borrow-books/add-borrow-book', {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            bookId: this.state.bookId,
            userId: this.state.userId,
        }).then(res => {
            if (res.data) {
                this.setState({
                    successDialog: {
                        showSuccessDialog: true,
                    }
                });
            }
        })
            .catch(err => {
                if (err) {
                    this.setState({
                        errorDialog: {
                            showErrorDialog: true,
                            errorMessage: err.response.data.message,
                        }
                    });
                }
            });
    };

    onCloseErrorDialog = () => {
        this.setState({
            errorDialog: {
                showErrorDialog: false,
                errorMessage: '',
            }
        });
    };

    onCloseSuccessDialog = () => {
        this.setState({
            successDialog: {
                showSucessDialog: false,
            }
        });
    };

    isFormValid = () => {
        return !(isEmpty(this.state.bookId) || isEmpty(this.state.userId) || this.state.startDate == null || this.state.endDate == null);
    };


    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>

                        <div>
                            <Grid container direction="row" justify="center">
                                <Grid item md={8} lg={5}>
                                    <ValidationField
                                        autoFocus
                                        label="Book ID"
                                        name="bookId"
                                        value={this.state.bookId}
                                        isValid={v => /.*\S.*/.test(v)}
                                        error={v => isEmpty(v) || !(/^(?!\s*$).+/.test(v))}
                                        helperText={/.*\S.*/.test(this.state.bookId) ? '' : this.state.bookId === '' ? '' : 'Empty Field'}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        onChange={e => this.onChangeForm(e.target.name, e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center">
                                <Grid item md={8} lg={5} style={{marginTop: 15}}>
                                    <TextField
                                        label="Student Libary ID"
                                        name="userId"
                                        // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                        // helperText={this.state.formValidation.reason}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        onChange={e => this.onChangeForm(e.target.name, e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center">

                                <Grid item md={8} lg={5}>
                                    <KeyboardDatePicker
                                        maxDate={this.state.endDate ? new Date(new Date(this.state.endDate).getTime() - 1000 * 60 * 60 * 24) : null}
                                        disablePast
                                        disableToolbar
                                        variant="inline"
                                        inputVariant="outlined"
                                        format="dd-MM-yyyy"
                                        fullWidth
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Start Date"
                                        value={this.state.startDate}
                                        onChange={(e, value) => this.onChangeForm('startDate', e)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center">
                                <Grid item md={8} lg={5}>
                                    <KeyboardDatePicker
                                        minDate={new Date(new Date(this.state.startDate).getTime() + 1000 * 60 * 60 * 24)}
                                        disablePast
                                        disableToolbar
                                        variant="inline"
                                        inputVariant="outlined"
                                        format="dd-MM-yyyy"
                                        fullWidth
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="End Date"
                                        value={this.state.endDate}
                                        onChange={(e, value) => this.onChangeForm('endDate', e)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <div style={{marginTop: 10}} className="flex-justify-center">
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                >Submit</Button>
                            </div>
                        </div>
                    </MuiPickersUtilsProvider>
                </form>
                <AlertDialog
                    showAlertModal={this.state.errorDialog.showErrorDialog}
                    title={'Error'}
                    desc={this.state.errorDialog.errorMessage}
                    onCloseConfirmationModal={this.onCloseErrorDialog}
                />
                <AlertDialog
                    showAlertModal={this.state.successDialog.showSuccessDialog}
                    title={'Success'}
                    desc={'Borrow book request success'}
                    onCloseConfirmationModal={this.onCloseSuccessDialog}
                />
            </div>
        );
    }
}

export default BorrowBookTab;