import React, {Component} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import MenuItem from "@material-ui/core/MenuItem";
import AlertDialog from "../../../components/AlertDialog";


const DarkerDisabledTextField = withStyles({
    root: {
        '& .MuiInputBase-root.Mui-disabled': {
            color: 'rgba(0, 0, 0, 0.6)', // (default alpha is 0.38)
        },
    },
})(TextField);

const initialState = {
    editing: false,
}

class BookEditDeleteModal extends Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({}, initialState);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const bookDetailReq = axios.post('book-details/get-book-by-book-detail-id', {
            id: nextProps.book.id
        });
        const genreListReq = axios.get('genres/get-all-genre');
        axios.all([bookDetailReq, genreListReq]).then(([bookDetail, genreList]) => {
            console.log(bookDetail, genreList);
            this.setState({
                book: bookDetail.data,
                genres: genreList.data
            });
        })
    }


    onCloseModal = () => {
        this.onCloseConfirmationModal();
        this.props.onChangeShowDetailModal(false);
    };

    onChange = (e) => {
        this.setState({
            book: {
                ...this.state.book,
                [e.target.name]: e.target.value
            }
        });
    };

    selectImage = (e) => {
        console.log(e.target.files[0]);
        this.setState({
            book: {
                ...this.state.book,
                uploadbookimg: e.target.files[0],
                bookimg: URL.createObjectURL(e.target.files[0]),
                imgchanged: true
            },
        });
    };

    uploadImage = async () => {
        if (this.state.book.imgchanged) {
            let imageFormObj = new FormData();
            imageFormObj.append('file', this.state.book.uploadbookimg);

            await axios
                .post('/file', imageFormObj)
                .then((data) => {
                    console.log(data.data);
                    this.setState({
                        book: {
                            ...this.state.book,
                            bookimgpath: data.data,
                        },
                    });
                    return data.data;
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });
        } else {
            console.log('book pic is not changed');
        }

    }

    updateBookDetail = async () => {
        //upload img if changed
        await this.uploadImage();

        //update user profile
        let uploadbookimgpath;
        if (this.state.book.imgchanged) {
            uploadbookimgpath = this.state.book.bookimgpath
        } else {
            uploadbookimgpath = this.state.book.bookimg
        }
        console.log(this.state.book.title,
            this.state.book.isbn,
            this.state.book.genre_id,
            uploadbookimgpath,
            this.state.book.summary);
        axios
            .post('book-details/update-book', {
                id: this.state.book.id,
                title: this.state.book.title,
                isbn: this.state.book.isbn,
                genreId: this.state.book.genre_id,
                bookimg: uploadbookimgpath,
                summary: this.state.book.summary,
            })
            .then((res) => {
                this.props.onUpdateBook();
                console.log(res);
            }).catch(err => {
            console.log(err.response.data.message);
        });

        this.setState({
            editing: false,
            dialog: true
        });
    };

    deleteBookDetail = () => {
        axios.post('book-details/delete-book', {
            id: this.state.book.id,
        }).then(res => {
            this.props.onUpdateBook();
            this.onCloseModal();
            console.log(res.data);
        });

    };

    onCloseConfirmationModal = () => {
        this.setState({
            showAlertModal: false,
        });
    };


    render() {
        const book = this.state.book ? this.state.book : this.props.book;
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
                        <div style={{padding: 10}}>
                            <Grid container spacing={1}>
                                <Grid item md={4} xs={12}>
                                    <Button
                                        disabled={!this.state.editing}
                                        onClick={() => this.refs.fileUploader.click()}
                                    >
                                        <img style={{height: 128, width: 128}} src={book.bookimg}
                                             alt="book_img"/>
                                    </Button>
                                    <input
                                        type="file"
                                        id="file"
                                        ref="fileUploader"
                                        style={{display: 'none'}}
                                        onChange={(e) => this.selectImage(e)}
                                    />

                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <DarkerDisabledTextField
                                        fullWidth
                                        disabled={!this.state.editing}
                                        label="Title"
                                        variant="outlined"
                                        name="title"
                                        value={book.title}
                                        onChange={this.onChange}
                                        className="profileInput gridmargin"
                                    />
                                    <DarkerDisabledTextField
                                        fullWidth
                                        disabled={!this.state.editing}
                                        label="ISBN"
                                        variant="outlined"
                                        name="isbn"
                                        value={book.isbn}
                                        onChange={this.onChange}
                                        className="profileInput gridmargin"
                                    />
                                    <DarkerDisabledTextField
                                        fullWidth
                                        select
                                        disabled={!this.state.editing}
                                        label="Genre"
                                        variant="outlined"
                                        name="genre_id"
                                        value={book.genre_id}
                                        onChange={this.onChange}
                                        className="profileInput gridmargin"
                                    >
                                        {this.state.genres ? this.state.genres.map(genre => (
                                            <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                                        )) : <MenuItem>{null}</MenuItem>}

                                    </DarkerDisabledTextField>
                                    <DarkerDisabledTextField
                                        fullWidth
                                        disabled={!this.state.editing}
                                        label="Description"
                                        variant="outlined"
                                        name="summary"
                                        value={book.summary}
                                        onChange={this.onChange}
                                        multiline
                                        row={4}
                                        className="profileInput gridmargin"
                                    />
                                </Grid>
                            </Grid>
                            <div
                                style={{
                                    marginTop: '50px',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    disabled={this.state.editing}
                                    variant="contained"
                                    onClick={() => this.setState({editing: true})}
                                    style={{width: '40%', maxWidth: '230px', height: '40px'}}
                                >
                                    Edit
                                </Button>
                                <Button
                                    disabled={!this.state.editing}
                                    variant="contained"
                                    onClick={() => this.updateBookDetail()}
                                    style={{
                                        backgroundColor: '#2B8C96',
                                        marginLeft: '20px',
                                        width: '40%',
                                        maxWidth: '230px',
                                        height: '40px',
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    disabled={this.state.editing}
                                    variant="contained"
                                    onClick={() => this.setState({showAlertModal:true})}
                                    style={{
                                        backgroundColor: '#FF0000',
                                        marginLeft: '20px',
                                        width: '40%',
                                        maxWidth: '230px',
                                        height: '40px'
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={this.state.showAlertModal}
                        onClose={this.onCloseConfirmationModal}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogTitle>Are you sure you want to delete the book?</DialogTitle>
                    <DialogContent>Once the book is deleted. The operation cannot be undone</DialogContent>
                    <DialogActions>
                        <Button onClick={this.onCloseConfirmationModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={()=>this.deleteBookDetail()} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default BookEditDeleteModal;