import React, {Component} from 'react';
import StudentBoilerplate from "../StudentBoilerplate";
import {Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import {formatDate} from "../../../util/DateUtils";

class BorrowHistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            borrowBookHistory: [],
        }
    }

    componentDidMount() {
        if (localStorage.usertoken) {
            var token = localStorage.usertoken;
            var decoded = jwt_decode(token);
            axios.post('borrow-books-history/get-book-history', {
                userId: decoded.id,
            }).then(res => {
                console.log(res.data);
                this.setState({
                    borrowBookHistory: res.data
                });
            }).catch(err => {
                console.log(err.toString);
            });
        }
    }

    render() {
        const borrowBookHistory = this.state.borrowBookHistory;
        return (
            <div>
                <StudentBoilerplate page={'borrowhistory'}/>
                <div className='content'>
                    <h2>Borrow History</h2>
                    <Card style={{padding: 10}}>
                        <CardContent className="flexGrow">
                            <TableContainer>
                                <Table stickyHeader aria-label="books">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No</TableCell>
                                            <TableCell>Book ID</TableCell>
                                            <TableCell align={"center"}>Book Cover</TableCell>
                                            <TableCell>Borrow Date</TableCell>
                                            <TableCell>Due Date</TableCell>
                                            <TableCell>Return Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {borrowBookHistory ? borrowBookHistory.map((book, index) => (
                                            <TableRow key={book.id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{book.bookId}</TableCell>
                                                <TableCell align="center"><img src={book.bookimg} alt="book_img" style={{ width: '120px', height: '120px' }}/></TableCell>
                                                <TableCell>{book.borrowDate?formatDate(book.borrowDate):'-'}</TableCell>
                                                <TableCell>{book.dueDate?formatDate(book.dueDate):'-'}</TableCell>
                                                <TableCell>{book.returnDate?formatDate(book.returnDate):'-'}</TableCell>
                                                <TableCell>{book.status?book.status:'-'}</TableCell>
                                            </TableRow>
                                        )) : ''}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </div>

            </div>
        );
    }
}

export default BorrowHistoryPage;