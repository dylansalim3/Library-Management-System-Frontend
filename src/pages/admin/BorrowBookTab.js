import React, {Component} from 'react';
import {Grid, TextField} from '@material-ui/core';

class BorrowBookTab extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} noValidate autoComplete="off">
                    <Grid container direction="row" justify="center">
                        <Grid item md={8}>
                            <TextField
                                label="BookID"
                                name="bookId"

                            />
                        </Grid>

                    </Grid>
                </form>
            </div>
        );
    }
}

export default BorrowBookTab;