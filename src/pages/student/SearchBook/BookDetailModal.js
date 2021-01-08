import React, {Component} from 'react';
import {
    Dialog,
    Button,
    DialogContent,
    Grid,
    DialogTitle,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import {formatDate} from "../../../util/DateUtils";
import BookReservationModal from './BookReservationModal';
import { BASE_URL } from '../../../constant/route.constant';

class BookDetailModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reservationModal: false,
      selectedbook: null,
    };
  }
  onCloseModal = () => {
    this.props.onChangeShowDetailModal(false);
  };

  onReserveBook = (bookId) => {
    console.log(bookId);
    this.setState({
      reservationModal:true,
      selectedbook: bookId
    })
    // this.props.onChangeShowBookReservationModal(true);
  };

  returnBook = () => {
    if (this.props.reserve) {
      if (this.props.allBook) {
        var arr = [];
        var allBook = this.props.allBook;
        for (var i in allBook) {
          arr.push(allBook[i]);
        }
        if (arr.length == 1) {
          var location = null;
          var singleId = null;
          for (var i in arr) {
            console.log(arr[i].location);
            location = arr[i].location;
            singleId = arr[i].bookid;
          }
          return (
            <p
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Location</span>
              <span>{location}</span>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.onReserveBook(singleId)}
              >
                RESERVE
              </Button>
            </p>
          );
        } else {
          return arr.map((book) => {
            // const bookStatus = book.status==='available'?false:true;
            // console.log(book.status);
            return (
              <div>
                <p>
                  {book.bookid}: {book.location}
                </p>
                <Button
                  // disabled={bookStatus}
                  variant="contained"
                  color="primary"
                  onClick={() => this.onReserveBook(book.bookid)}
                >
                  RESERVE
                </Button>
              </div>
            );
          });
        }
      } else {
        return (
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Location</span>
            <span>{this.props.book.location}</span>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.onReserveBook(this.props.book.id)}
            >
              RESERVE
            </Button>
          </p>
        );
      }
    }
  };

  render() {
    const columns = [
      {
        id: 'No',
        label: 'No',
        minWidth: 50,
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'Book ID',
        label: 'Book ID',
        minWidth: 150,
        format: (value) => value.toLocaleString('en-US'),
      },
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
    const authors = this.props.book.author;
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
                    src={BASE_URL + this.props.book.bookimg}
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
                    <span>Genre</span>
                    <span>{genre ? genre.name : '-'}</span>
                  </p>
                  <Grid container>
                    <Grid item xs={3}>
                      Description
                    </Grid>
                    <Grid item xs={9}>
                      <span
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          textOverflow: 'scale',
                        }}
                      >
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
                    <span>{authors ? authors : '-'}</span>
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
                  {this.returnBook()}

                </Grid>
              </Grid>
              {this.props.book.type === 'digital' ? (
                <div
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <a
                    href={
                      process.env.REACT_APP_SERVER_BASE_URL +
                      '/' +
                      this.props.book.e_book
                    }
                    without
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="contained" color="primary">
                      View e-book
                    </Button>
                  </a>
                </div>
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
        <BookReservationModal
          openModal={this.state.reservationModal}
          selectedbook={this.state.selectedbook}
          onChangeShowBookReservationModal={() => {
            this.setState({
              reservationModal: false,
            });
          }}
        />
      </div>
    );
  }
}

export default BookDetailModal;