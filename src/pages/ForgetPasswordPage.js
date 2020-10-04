import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";
import {Button} from "@material-ui/core";
import * as axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const ForgetPasswordPage = () => {
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const {register, handleSubmit, watch, setValue, errors} = useForm();
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);

    const onChange = (e) => {
        setRecoveryEmail(e.target.value);
    };

    const onSubmit = () => {
        axios.post("users/password-recovery", {
            email: recoveryEmail,
            resetPasswordLinkPrefix: process.env.REACT_APP_WEB_BASE_URL + '/password-recovery'
        }).then(result => {
            setOpenSuccessSnackbar(true);
        }).catch(err => {
            setOpenErrorSnackbar(true);
        });
    };

    return (
        <Grid
            container
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
            }}
        >

            <h1>Reset Password</h1>
            <p>Enter your email and we'll send you a link to get back into your account.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    style={{width: '250px'}}
                    label="Email Address"
                    variant="outlined"
                    name="email"
                    inputRef={register({
                        required: true, pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                    error={errors?.email}
                    helperText={errors?.email && "Please enter a valid email address"}
                    value={recoveryEmail}
                    onChange={onChange}
                />

                <div className="flex-justify-center" style={{marginTop: 15}}>
                    <Button variant="contained"
                            color="primary" type="submit">
                        Submit
                    </Button>
                </div>

            </form>

            <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={() => {
                setOpenErrorSnackbar(false)
            }}>
                <Alert onClose={() => {
                    setOpenErrorSnackbar(false)
                }} severity="error">
                    Error occured. Please try again later
                </Alert>
            </Snackbar>

            <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={() => {
                setOpenSuccessSnackbar(false)
            }}>
                <Alert onClose={() => {
                    setOpenSuccessSnackbar(false)
                }} severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        </Grid>

    );
};

export default ForgetPasswordPage;
