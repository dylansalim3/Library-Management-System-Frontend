import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import {useForm} from "react-hook-form";
import {Button} from "@material-ui/core";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import Alert from "@material-ui/lab/Alert/Alert";
import {useSnackbar} from "notistack";
import AlertDialog from "../components/AlertDialog";
import Box from "@material-ui/core/Box/Box";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {topgreen} from "../style/Color";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: topgreen,
        },
    },
});

const ResetPasswordPage = (props) => {


    const [verificationHash, setVerificationHash] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');

    const {register, handleSubmit, watch, setValue, errors} = useForm();
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const {match: {params}} = props;
        setVerificationHash(params.hash);
        axios.post('users/get-user-by-verification-hash', {
            hash: params.hash,
        }).then(res => {
            if (res.data.user) {
                setEmail(res.data.user.email);
            }
        })
    }, []);

    const onSubmit = () => {
        axios.post('users/reset-password', {
            'email': email,
            'verificationHash': verificationHash,
            'newPassword': confirmationPassword
        }).then(res => {
            setShowSuccessDialog(true);
        }).catch(err => {
            enqueueSnackbar('Password reset failed', {variant: 'error', transitionDuration: 1000});
        })
    };

    const isPasswordEqual = () => password === confirmationPassword;

    const onCloseSuccessfulModal = () => {
        setShowSuccessDialog(false);
        props.history.push('/');
    };

    return (
        <MuiThemeProvider theme={theme}>

            <Box display="flex" justifyContent="center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <h1>Password Recovery</h1>
                    </Box>
                    <Box p={1}>
                        <TextField
                            style={{width: '250px'}}
                            label="Email Address"
                            variant="outlined"
                            name="email"
                            disabled
                            value={email}
                            required
                            type="email"
                        />
                    </Box>
                    <Box p={1}>
                        <TextField
                            style={{width: '250px'}}
                            label="Password"
                            variant="outlined"
                            name="password"
                            inputRef={register({
                                // required: 'Field cannot leave blank',
                                min: {value: 8, message: "Password must contain minimum 8 characters"},
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/i,
                                    message: "Password must contain at least 1 letter and 1 number"
                                }
                            })}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors?.password != null}
                            helperText={errors?.password && errors.password.message}
                            value={password}
                            // type="password"
                        />
                    </Box>
                    <Box p={1}>
                        <TextField
                            style={{width: '250px'}}
                            label="Password Confirmation"
                            variant="outlined"
                            name="confirmationPassword"
                            inputRef={register({
                                required: 'Field cannot leave blank',
                                validate: {isPasswordEqual: value => isPasswordEqual() || 'Both password must be equal'}
                            })}
                            error={errors?.confirmationPassword != null}
                            helperText={errors?.confirmationPassword && errors.confirmationPassword.message}
                            value={confirmationPassword}
                            // type="password"
                            onChange={(e) => setConfirmationPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <div className="flex-justify-center" style={{marginTop: 15}}>
                        <Button variant="contained"
                                color="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
                <AlertDialog
                    title="Password Reset Successful"
                    desc="Your password have been updated. Proceed to Login"
                    confirmationText="OK"
                    showAlertModal={showSuccessDialog}
                    onCloseConfirmationModal={onCloseSuccessfulModal}
                />
            </Box>
        </MuiThemeProvider>
    );
};

export default ResetPasswordPage;