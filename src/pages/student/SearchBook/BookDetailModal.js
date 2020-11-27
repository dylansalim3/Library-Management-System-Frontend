import React, {Component} from 'react';
import {Dialog,Button, DialogContent,Grid, DialogTitle,TableContainer,Table,TableHead,TableRow,TableCell,TableBody} from '@material-ui/core';
import {formatDate} from "../../../util/DateUtils";
import axios from 'axios';

class BookDetailModal extends Component {
   
    viewEbook = () =>{
        // console.log(this.props.book.e_book);
        let ebookpath = 'http://localhost:5000/'+this.props.book.e_book;
        // let ebookpath = this.props.book.e_book;
            axios
              .get('/viewebook',{
                  params:{ebookpath:ebookpath}
              })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
    }

    onCloseModal = () => {
        this.props.onChangeShowDetailModal(false);
    };

    onReserveBook = (bookId) => {
        this.props.onChangeShowBookReservationModal(bookId);
    };

    render() {
         console.log(process.env.REACT_APP_SERVER_BASE_URL);
        // console.log(this.props.book);
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
        const authors = this.props.book.authors;
        const datepublished = this.props.book.datepublished;
        const publisher = this.props.book.publisher;
        return (
          <div>
            <Dialog
              open={this.props.openModal}
              onClose={() => this.onCloseModal()}
              scroll="body"
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              fullWidth
            >
              <DialogTitle id="scroll-dialog-title" className="textCenter">
                {this.props.book.title}
              </DialogTitle>
              <DialogContent dividers>
                <div style={{ padding: 10 }}>
                  <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                      <img
                        style={{ height: 128, width: 128 }}
                        src={this.props.book.bookimg}
                        alt="book_img"
                      />
                    </Grid>
                    <Grid item md={8} xs={12}>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>Title</span>
                        <span>{this.props.book.title}</span>
                      </p>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>ISBN</span>
                        <span>{this.props.book.isbn}</span>
                      </p>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>Type</span>
                        <span>{this.props.book.type}</span>
                      </p>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>E book path</span>
                        <span>{this.props.book.e_book}</span>
                      </p>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>Genre</span>
                        <span>{genre ? genre.name : '-'}</span>
                      </p>
                      <Grid container>
                        <Grid item xs={3}>
                          Description
                        </Grid>
                        <Grid item xs={9}>
                          <span style={{ textOverflow: 'scale' }}>
                            {desc ? desc : '-'}
                          </span>
                        </Grid>
                      </Grid>
                      {/*<p>*/}
                      {/*    <span>Description</span>*/}
                      {/*    <span className="textRight"></span>*/}
                      {/*</p>*/}
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>Author</span>
                        <span>{authors ? authors.name : '-'}</span>
                      </p>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>Date Published</span>
                        <span>
                          {datepublished ? formatDate(datepublished) : '-'}
                        </span>
                      </p>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>Publisher</span>
                        <span>{publisher ? publisher : '-'}</span>
                      </p>
                      <p
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>Location</span>
                        <span>{location ? location : '-'}</span>
                      </p>
                    </Grid>
                  </Grid>
                  {this.props.book.type === 'digital' ? (
                    <a
                      href={
                        process.env.REACT_APP_SERVER_BASE_URL +'/'+
                        this.props.book.e_book
                      }
                      without
                      rel="noopener noreferrer"
                      target="_blank"
                      style={{textDecoration:'none'}}
                    >
                      <Button
                        onClick={this.viewEbook}
                        variant="contained"
                        color="primary"
                      >
                        View e-book
                      </Button>
                    </a>
                  ) : null}

                  {/*<TableContainer>*/}
                  {/*    <Table stickyHeader aria-label="books">*/}
                  {/*        <TableHead>*/}
                  {/*            <TableRow>*/}
                  {/*                {columns.map(column=>(*/}
                  {/*                    <TableCell*/}
                  {/*                    key={column.id}*/}
                  {/*                    align="center">*/}
                  {/*                        {column.label}*/}
                  {/*                    </TableCell>*/}
                  {/*                ))}*/}
                  {/*            </TableRow>*/}
                  {/*        </TableHead>*/}
                  {/*        <TableBody>*/}
                  {/*            {books?books.map((book,index)=>(*/}
                  {/*                <TableRow key={book.id}>*/}
                  {/*                    <TableCell align="center">{index+1}</TableCell>*/}
                  {/*                    <TableCell align="center">{book.id}</TableCell>*/}
                  {/*                    <TableCell align="center">{location}</TableCell>*/}
                  {/*                    <TableCell align="center">*/}
                  {/*                        <Button variant="contained" color="primary" onClick={()=>this.onReserveBook(book.id)}>RESERVE</Button>*/}
                  {/*                    </TableCell>*/}
                  {/*                </TableRow>*/}
                  {/*            )):''}*/}
                  {/*        </TableBody>*/}
                  {/*    </Table>*/}
                  {/*</TableContainer>*/}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
    }
}

export default BookDetailModal;