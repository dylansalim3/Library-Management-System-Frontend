import React from 'react';
import AdminBoilerplate from "../AdminBoilerplate";
import {Box, Button, Grid, Paper, TextField} from "@material-ui/core";
import * as axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import {EditRoleCard} from "./EditRoleCard";
import {UserDetailCard} from "./UserRoleDetailCard";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


const RoleAssignmentPage = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [selectedProfile, setSelectedProfile] = React.useState({});
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);
    const [confirmationDialogText, setConfirmationDialogText] = React.useState({});
    const [selectedRoleId, setSelectedRoleId] = React.useState(-1);

    const loading = open && options.length === 0;
    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const request = await axios.post('users/admin/get-all-profile');

            const profileList = request.data;
            if (active) {
                setOptions(profileList);
            }

            return () => {
                active = false;
            };
        })();
    }, [loading])

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);



    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(selectedProfile);
    }

    const removeRole = (roleId) => {
        if (selectedProfile.roles.length === 1) {
            setOpenErrorSnackbar(true);
        } else {
            setConfirmationDialogText({
                title: "Are you sure you want to remove the specific role?",
                content: "By doing so, the user data associated to that user will be erased. This operation cannot be undone."
            });
            setSelectedRoleId(roleId);
            setOpenConfirmationDialog(true);
        }
    }

    const confirmRemoveRole = () => {
        axios.post("users/delete-user-role",{
            "userId":selectedProfile.id,
            "roleId":selectedRoleId
        }).then(async res=>{
            setOpenSuccessSnackbar(true);
            setOpenConfirmationDialog(false);
            await refreshSelectedProfileData();
        }).catch(err=>{
            setOpenErrorSnackbar(false);
        })
    }

    const addRole = (roleId) => {
        axios.post("users/add-user-role",{
            "userId":selectedProfile.id,
            "roleId":roleId
        }).then(async res=>{
            setOpenSuccessSnackbar(true);
            await refreshSelectedProfileData();
        }).catch(err=>{
            setOpenErrorSnackbar(false);
        })
    }

    const refreshSelectedProfileData = async () =>{
        const request = await axios.post('users/admin/get-all-profile');

        const profileList = request.data;
        setSelectedProfile(profileList.find((profile) => profile.id === selectedProfile.id));
    }

    const onCloseDialog = () => {
        setConfirmationDialogText({});
        setOpenConfirmationDialog(false);
    }

    return (
        <div>
            <AdminBoilerplate page={'role_assignment'}/>
            <div className="content">
                <Paper style={{padding: 20}}>
                    <h2 className="textCenter">Role Assignment</h2>
                    <form onSubmit={onSubmit} noValidate autoComplete="off">
                        <Grid container direction="row" justify="center">
                            <Grid item md={5} lg={5}>
                                <Autocomplete
                                    fullWidth
                                    id="select Id"
                                    open={open}
                                    onOpen={() => {
                                        setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                    getOptionSelected={(option, value) => {
                                        return option.id === value.id
                                    }}
                                    getOptionLabel={(option) => {
                                        return option.id.toString();
                                    }}
                                    options={options}
                                    loading={loading}
                                    filterSelectedOptions
                                    onInputChange={(event, newInputValue) => {
                                        if (options.length > 0 && newInputValue.length > 0) {
                                            let option = options.find(option => {
                                                return option.id == newInputValue;
                                            });
                                            if (option) {
                                                setSelectedProfile(option);
                                            }
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            label="Enter User Id"
                                            variant="outlined"
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center" style={{marginTop: 15}}>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >Submit</Button>
                        </Grid>
                    </form>


                    {selectedProfile !== {} && selectedProfile.roles ? <Grid container direction="row" justify="center">
                        <Box width="100%">
                            <UserDetailCard profileImg={selectedProfile.profileimg}
                                            name={selectedProfile.first_name + selectedProfile.last_name}
                                            email={selectedProfile.email}
                                            phoneNumber={selectedProfile.phonenum}
                                            roles={selectedProfile.roles}
                                            address={selectedProfile.address}
                                            dateCreated={selectedProfile.created}/>
                            <EditRoleCard name={selectedProfile.first_name + selectedProfile.last_name}
                                          selectedRoleId={selectedProfile.roles.map(role => role.id)}
                                          onAddRole={(roleId) => {
                                              addRole(roleId);
                                          }}
                                          onDeleteRole={(roleId) => {
                                              removeRole(roleId);
                                          }}/>
                        </Box>
                    </Grid> : ''}


                </Paper>

                <Dialog
                    open={openConfirmationDialog}
                    onClose={onCloseDialog}
                >
                    <DialogTitle>
                        {confirmationDialogText ? confirmationDialogText.title : ''}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {confirmationDialogText ? confirmationDialogText.content : ''}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={onCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmRemoveRole} color="danger">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={() => {
                    setOpenErrorSnackbar(false)
                }}>
                    <Alert onClose={() => {
                        setOpenErrorSnackbar(false)
                    }} severity="error">
                        Error occurred
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
            </div>
        </div>
    );
};

export default RoleAssignmentPage;