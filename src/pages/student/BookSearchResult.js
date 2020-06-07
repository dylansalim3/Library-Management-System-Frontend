import React, {Component} from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Grid} from '@material-ui/core';
import BookDetailModal from "./BookDetailModal";
import BookReservationModal from "./BookReservationModal";

class BookSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBookDetail: {},
            showBookDetailModal: false,
            bookReservationModal:{
                showBookReservationModal:false,
                bookId:null,
            },
        };
    }

    onBookSelected = (selectedBookDetail) => {
        this.setState({
            selectedBookDetail: selectedBookDetail,
            showBookDetailModal: true,
        });
    };

    displaySearchResult = (searchResults) => {
        if (searchResults) {
            return searchResults.map(searchResult => {
                return (
                    <Grid item xs={12} sm={6} md={4} key={searchResult.id}>
                        {this.displayBookDetail(searchResult)}
                    </Grid>
                );
            });
        } else {
            return (
                <p style={{margin: 'auto'}}>No result found</p>
            );
        }
    };

    displayBookDetail = (bookDetail) => {
        const bookId = bookDetail.id;
        const title = bookDetail.title;
        const desc = bookDetail.summary;
        const imageLink = bookDetail.bookimg;
        return (
            <Card style={{padding: 10}}>
                <CardContent className="flexGrow">
                    <CardActionArea onClick={() => this.onBookSelected(bookDetail)}>
                        <CardMedia
                            component="img" className="center"
                            src="https://drive.google.com/uc?export=view&id=1p-0OOooMboFMYibNWdxL9zAc2xXPBxcD"
                            height={140}
                            alt="book img"
                            title={title}/>
                        <h3 className="textCenter">{title}</h3>
                        <p className="textCenter">{desc}</p>
                    </CardActionArea>
                </CardContent>
            </Card>
        );
    };

    onChangeShowDetailModal = (data) => {
        this.setState({
            showBookDetailModal: data,
        });
    };

    setSelectedBookId = (bookId) =>{
        this.setState({
            bookReservationModal:{
                bookId:bookId
            }
        });
    };

    onChangeShowBookReservationModal = (show) =>{
        console.log('here');
        this.setState({
            bookReservationModal:{
                showBookReservationModal:show,
            }
        });
    };

    render() {
        const searchResults = this.props.result;
        return (
            <div id="searchResult">
                <h2>Search Result</h2>
                <Grid container>
                    {this.displaySearchResult(searchResults)}
                </Grid>
                <BookDetailModal
                    openModal={this.state.showBookDetailModal}
                    book={this.state.selectedBookDetail}
                    onChangeShowDetailModal={e => {
                        this.onChangeShowDetailModal(e)
                    }}
                    onChangeShowBookReservationModal={(bookId)=>{
                        this.setSelectedBookId(bookId);
                        this.onChangeShowBookReservationModal(true);
                    }}
                />
                <BookReservationModal
                    openModal={this.state.bookReservationModal.showBookReservationModal}
                    book={this.state.bookReservationModal.bookId}
                    onChangeShowBookReservationModal={()=>{
                        this.onChangeShowBookReservationModal(false);
                    }
                    }
                />
            </div>
        );
    }
}

export default BookSearchResult;