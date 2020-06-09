import React, {Component} from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

class RenewBookTab extends Component {
    render() {
        return (
            <div>
                <h3 style={{color:'blue'}}>Pending List</h3>
                <TableContainer>
                    <Table stickyHeader aria-label="books">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Book ID</TableCell>
                                <TableCell>User ID</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>New Date</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*{books?books.map((book,index)=>(*/}
                            {/*    <TableRow key={book.id}>*/}
                            {/*        <TableCell align="center">{index+1}</TableCell>*/}
                            {/*        <TableCell align="center">{book.id}</TableCell>*/}
                            {/*        <TableCell align="center">{location}</TableCell>*/}
                            {/*        <TableCell align="center">*/}
                            {/*            <Button variant="contained" color="primary" onClick={()=>this.onReserveBook(book.id)}>RESERVE</Button>*/}
                            {/*        </TableCell>*/}
                            {/*    </TableRow>*/}
                            {/*)):''}*/}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default RenewBookTab;