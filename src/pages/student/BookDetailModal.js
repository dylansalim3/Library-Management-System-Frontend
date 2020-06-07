import React, {Component} from 'react';
import {Dialog,Button, DialogContent,Grid, DialogTitle,TableContainer,Table,TableHead,TableRow,TableCell,TableBody} from '@material-ui/core';

class BookDetailModal extends Component {

    onCloseModal = () => {
        this.props.onChangeShowDetailModal(false);
    };

    onReserveBook = (bookId) => {
        this.props.onChangeShowBookReservationModal(bookId);
    };

    render() {
        const columns = [
            { id: 'No', label: 'No', minWidth: 50,
                format: (value) => value.toLocaleString('en-US'),},
            { id: 'Book ID', label: 'Book ID', minWidth: 150,
                format: (value) => value.toLocaleString('en-US'),},
            {
                id: 'location',
                label: 'Location',
                minWidth: 170,
            },
            {
                id: 'Reserve',
                label: 'Reserve',
                minWidth: 170,
            },
        ];
        const location = this.props.book.location;
        const desc = this.props.book.summary;
        const genre = this.props.book.genre;
        const books = this.props.book.books;
        return (
            <div>
                <Dialog
                    open={this.props.openModal}
                    onClose={() => this.onCloseModal()}
                    scroll="body"
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth>
                    <DialogTitle id="scroll-dialog-title" className="textCenter">{this.props.book.title}</DialogTitle>
                    <DialogContent dividers>
                        <div style={{padding:10}}>
                            <Grid container spacing={1}>
                                <Grid item md={4} xs={12}>
                                    <img style={{height:128,width:128}} src="https://drive.google.com/uc?export=view&id=1p-0OOooMboFMYibNWdxL9zAc2xXPBxcD" alt="book_img"/>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <p style={{display:'flex',justifyContent:'space-between'}}>
                                        <span>Title</span>
                                        <span>{this.props.book.title}</span>
                                    </p>
                                    <p style={{display:'flex',justifyContent:'space-between'}}>
                                        <span>ISBN</span>
                                        <span>{this.props.book.isbn}</span>
                                    </p>
                                    <p style={{display:'flex',justifyContent:'space-between'}}>
                                        <span>Genre</span>
                                        <span>{genre?genre.name:'-'}</span>
                                    </p>
                                    <p style={{display:'flex',justifyContent:'space-between'}}>
                                        <span>Description</span>
                                        <span>{desc?desc:'-'}</span>
                                    </p>
                                    <p style={{display:'flex',justifyContent:'space-between'}}>
                                        <span>Number of Copies</span>
                                        <span>{books?books.length:0}</span>
                                    </p>
                                </Grid>
                            </Grid>

                            <TableContainer>
                                <Table stickyHeader aria-label="books">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map(column=>(
                                                <TableCell
                                                key={column.id}
                                                align="center">
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {books?books.map((book,index)=>(
                                            <TableRow key={book.id}>
                                                <TableCell align="center">{index+1}</TableCell>
                                                <TableCell align="center">{book.id}</TableCell>
                                                <TableCell align="center">{location}</TableCell>
                                                <TableCell align="center">
                                                    <Button variant="contained" color="primary" onClick={()=>this.onReserveBook(book.id)}>RESERVE</Button>
                                                </TableCell>
                                            </TableRow>
                                        )):''}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default BookDetailModal;