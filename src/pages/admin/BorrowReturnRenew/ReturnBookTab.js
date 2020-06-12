import React, {Component} from 'react';
import {Button, Grid, TextField} from "@material-ui/core";
import axios from 'axios';
import AlertDialog from "../../../components/AlertDialog";

class ReturnBookTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: '',
            errorDialog: {
                showErrorDialog: false,
                errorMessage: '',
            },
            successDialog: {
                showSuccessDialog: false,
            }
        }
    }

    onChangeForm = (name, value) => {
        this.setState({
            [name]: value,
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.submitReturnBookRequest();
    };

    submitReturnBookRequest = () => {
        axios.post('borrow-books-history/return-book', {
            bookId: this.state.bookId
        }).then(res => {
            if (res.data.err) {
                this.setState({
                    successDialog: {
                        showSuccessDialog: true,
                    }
                });
            }
        })
            .catch(err => {
                if (err) {
                    console.log(err.response.data);
                    this.setState({
                        errorDialog: {
                            showErrorDialog: true,
                            errorMessage: err.response.data.message,
                        }
                    });
                }
        })
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

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} noValidate autoComplete="off">

                    <Grid container direction="row" justify="center">
                        <Grid item md={8} lg={5} style={{marginTop: 15}}>
                            <TextField
                                label="Book ID"
                                name="bookId"
                                // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                // helperText={this.state.formValidation.reason}
                                fullWidth
                                required
                                variant="outlined"
                                onChange={e => this.onChangeForm(e.target.name, e.target.value)}
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
                    desc={'Return book request success'}
                    onCloseConfirmationModal={this.onCloseSuccessDialog}
                />
            </div>
        );
    }
}

export default ReturnBookTab;