import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {topgreen} from "../style/Color";
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";
import {Button} from "@material-ui/core";
import * as axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const ForgetPassword = () => {
    const [recoveryEmail, setRecoveryEmail] = useState(null);
    const {register, handleSubmit, watch, setValue, errors} = useForm();
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);

    const onChange = (e) => {
        setRecoveryEmail(e.target.value);
    }

    const onSubmit = () => {
        axios.post("users/reset-password", {email: recoveryEmail}).then(result => {
            setOpenSuccessSnackbar(true);
        }).catch(err => {
            setOpenErrorSnackbar(true);
        });
    }

    return (
        <Grid
            container
            spacing={1}
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#F1F1F1',
                height: '100vh',
            }}
        >
            <h1 style={{color: topgreen}}>Reset Password</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    style={{width: '250px'}}
                    label="Email Address"
                    variant="outlined"
                    name="email"
                    inputRef={register({required: true})}
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

export default ForgetPassword;
