import React, {Component} from 'react';
import axios from 'axios';
import {Grid, TextField} from "@material-ui/core";
import {isEmpty} from "../util/StringUtils";


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{
                active: null,
                created: '',
                email: "",
                first_name: "",
                id: null,
                last_name: "",
                password: "",
                verification_hash: null,
            }
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.hash);
        axios.post('users/get-user-by-verification-hash',{
            hash:params.hash,
        }).then(res=>{
            this.setState({
               user:res.data,
            });
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })

    }

    onChangeForm = (name, value) => {
        if(isEmpty(value)){

        }
        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <div>
                <h2 className="textCenter">Account Registration</h2>
                <p className="textCenter">Please complete your registration</p>
                <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                    <Grid container direction="row" justify="center">
                        <Grid item md={8} lg={5}>
                            <TextField
                                label="Student Library ID"
                                name="userId"
                                value={this.state.user.id}
                                // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                // helperText={this.state.formValidation.reason}
                                fullWidth
                                variant="outlined"
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item md={8} lg={5}>
                            <TextField
                                label="Email"
                                name="email"
                                // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                // helperText={this.state.formValidation.reason}
                                fullWidth
                                variant="outlined"
                                value={this.state.user.email}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item md={8} lg={5}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                // helperText={this.state.formValidation.reason}
                                fullWidth
                                required
                                variant="standard"
                                onChange={e => this.onChangeForm(e.target.name, e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item md={8} lg={5}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                // helperText={this.state.formValidation.reason}
                                fullWidth
                                required
                                variant="standard"
                                onChange={e => this.onChangeForm(e.target.name, e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item md={8} lg={5}>
                            <TextField
                                label="Password"
                                name="password"
                                // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                // helperText={this.state.formValidation.reason}
                                fullWidth
                                required
                                variant="standard"
                                onChange={e => this.onChangeForm(e.target.name, e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item md={8} lg={5}>
                            <TextField
                                label="Address"
                                name="address"
                                // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                // helperText={this.state.formValidation.reason}
                                fullWidth
                                required
                                variant="standard"
                                onChange={e => this.onChangeForm(e.target.name, e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Grid item md={8} lg={5}>
                            <TextField
                                label="Phone Number"
                                name="phonenum"
                                // error={this.state.formValidation.error && this.state.formValidation.reason !== ''}
                                // helperText={this.state.formValidation.reason}
                                fullWidth
                                required
                                variant="standard"
                                onChange={e => this.onChangeForm(e.target.name, e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default Registration;