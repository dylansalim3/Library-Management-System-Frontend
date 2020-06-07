import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import jwt_decode from 'jwt-decode';
import '../../style/Style.css';
import TextField from '@material-ui/core/TextField';
import { topgreen, drawergreen } from '../../style/Color';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import {FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// var JsBarcode = require('jsbarcode');
// var { createCanvas } = require('canvas');
// var canvas = createCanvas(200,200);

var Barcode = require('react-barcode');

export default class Addbook extends Component {
  
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      role: null,
      bookcover: null,
      bookimg: null,
      bookimgpath: null,
      isbn: '',
      booktitle: '',
      author: '',
      datepublished: '',
      publisher: '',
      type: '',
      ebook: null,
      category: '',
      genre: '',
      summary: '',
      location: '',
      status: 'available',
      dialogopen: false,
      addedBookID: ''
    };
  }

  componentDidMount() {
    
    if (localStorage.usertoken) {
      var token = localStorage.usertoken;
      var decoded = jwt_decode(token);
      this.setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
        role: decoded.role,
      });
      console.log('my role is ' + decoded.role);
      if (decoded.role === 'student' || decoded.role === 'teacher') {
        this.props.history.push('/studentdashboard'); //push to teacher dashboard and student dashboard
        console.log(
          'Students and teachers are not allowed to access this page.'
        );
      }
    } else {
      this.props.history.push('/');
      console.log('you are not logged in');
    }
  }

  selectImage = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      bookcover: e.target.files[0],
      bookimg: URL.createObjectURL(e.target.files[0]),
    });
  };

  uploadImage = async (imageFormObj) => {
    if(this.state.bookimgpath){
    await axios
      .post('/file', imageFormObj)
      .then((data) => {
        console.log(data.data);
        this.setState({
          bookimgpath: data.data,
        });
        return data.data;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    }else{
      console.log("Book cover is empty");
    }
  };

  uploadBook = async (imageFormObj) => {

    await this.uploadImage(imageFormObj);
    console.log(this.state.bookimgpath);
    if(this.state.summary&&this.state.location){
    axios
      .post('/books/add', {
        isbn: this.state.isbn,
        title: this.state.booktitle,
        datepublished: this.state.datepublished,
        bookimg: this.state.bookimgpath,
        status: this.state.status,
        publisher: this.state.publisher,
        type: this.state.type,
        ebook: this.state.ebook,
        category: this.state.category,
        genre: this.state.genre,
        summary: this.state.summary,
        location: this.state.location,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.bookdetail.id);
        // JsBarcode('#barcode', 'Hello');
        
        this.setState({
          addedBookID:res.data.bookdetail.id,
          dialogopen: true
        })
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      console.log("location and summary cannot be empty");
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let imageFormObj = new FormData();
    imageFormObj.append('file', this.state.bookcover);
    this.uploadBook(imageFormObj);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {


    const CssTextField = withStyles({
      root: {
        '& .MuiInputLabel-outlined': {
          color: drawergreen,
        },
        '& label.Mui-focused': {
          color: topgreen,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: topgreen,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: topgreen,
            borderWidth: '1px',
          },
          '&:hover fieldset': {
            borderColor: topgreen,
          },
          '&.Mui-focused fieldset': {
            borderColor: topgreen,
          },
        },
      },
    })(TextField);

    return (
      <div>
        <Sidebar
          role={this.state.role}
          user={this.state.first_name}
          selected="add_book"
        />

        <Dialog
          open={this.state.dialogopen}
          onClose={() => this.setState({ dialogopen: false })}
        >
          <DialogTitle>Book has been added succesfully</DialogTitle>
          <DialogContent>
            <DialogContentText style={{display:"flex",alignItems:'center',flexDirection:'column' }}>
              Please print the generated barcode below and paste it on the book.
              <Barcode
                style={{ width: '100%' ,backgroundColor:'red'}}
                value={this.state.addedBookID}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button disabled color="primary">
              Print
            </Button>
            <Button
              onClick={() => this.setState({ dialogopen: false })}
              color="primary"
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <div className="content">
          <Grid container>
            <form
              style={{ width: '100%' }}
              onSubmit={(e) => {
                this.onSubmit(e);
                return false;
              }}
            >
              <Grid item xs={12}>
                <h1>Add Book</h1>
              </Grid>
              <Grid container>
                <Grid item sm={4} xs={12}>
                  <Grid item xs={12}>
                    <TextField
                      label="ISBN"
                      variant="outlined"
                      name="isbn"
                      value={this.state.isbn}
                      onChange={this.onChange}
                      className="gridWidth gridmargin"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Book Title"
                      variant="outlined"
                      name="booktitle"
                      value={this.state.booktitle}
                      onChange={this.onChange}
                      className={'gridWidth gridmargin'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Author"
                      variant="outlined"
                      name="author"
                      value={this.state.author}
                      onChange={this.onChange}
                      className={'gridWidth gridmargin'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      type="date"
                      label="Date Published"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="datepublished"
                      value={this.state.datepublished}
                      onChange={this.onChange}
                      className={'gridWidth gridmargin'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Publisher"
                      variant="outlined"
                      name="publisher"
                      value={this.state.publisher}
                      onChange={this.onChange}
                      className={'gridWidth gridmargin'}
                    />
                  </Grid>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Grid item xs={12}>
                    <FormControl
                      className={'gridWidth gridmargin'}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="booktype">Type</InputLabel>
                      <Select
                        native
                        required
                        value={this.state.type}
                        onChange={this.onChange}
                        inputProps={{
                          name: 'type',
                          id: 'booktype',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={'digital'}>Digital</option>
                        <option value={'physical'}>Physical</option>
                      </Select>
                    </FormControl>
                    {/* <TextField
                      required
                      label="Type"
                      variant="outlined"
                      name="type"
                      value={this.state.type}
                      onChange={this.onChange}
                      className={'gridWidth gridmargin'}
                      select
                    >
                      <MenuItem value={'digital'}>Digital</MenuItem>
                      <MenuItem value={'physical'}>Physical</MenuItem>
                    </TextField> */}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      label="E-book"
                      variant="outlined"
                      name="ebook"
                      value={this.state.ebook}
                      onChange={this.onChange}
                      value="Not available currently"
                      className={'gridWidth gridmargin'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      className={'gridWidth gridmargin'}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="bookcategory">Category</InputLabel>
                      <Select
                        native
                        required
                        value={this.state.category}
                        onChange={this.onChange}
                        inputProps={{
                          name: 'category',
                          id: 'bookcategory',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>Textbook</option>
                        <option value={2}>Magazine</option>
                        <option value={3}>Comic</option>
                      </Select>
                    </FormControl>
                    {/* <TextField
                      label="Category"
                      variant="outlined"
                      name="category"
                      value={this.state.category}
                      onChange={this.onChange}
                      className={'gridWidth gridmargin'}
                      select
                    >
                      <MenuItem value={1}>Textbook</MenuItem>
                      <MenuItem value={2}>Magazine</MenuItem>
                      <MenuItem value={3}>Comic</MenuItem>
                    </TextField> */}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      className={'gridWidth gridmargin'}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="bookgenre">Genre</InputLabel>
                      <Select
                        native
                        required
                        value={this.state.genre}
                        onChange={this.onChange}
                        inputProps={{
                          name: 'genre',
                          id: 'bookgenre',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>Mystery</option>
                        <option value={2}>Fantasy</option>
                      </Select>
                    </FormControl>

                    {/* <TextField
                      label="Genre"
                      variant="outlined"
                      name="genre"
                      value={this.state.genre}
                      onChange={this.onChange}
                      className={'gridWidth gridmargin'}
                      select
                    >
                      <MenuItem value={1}>Mystery</MenuItem>
                      <MenuItem value={2}>Fantasy</MenuItem>
                    </TextField> */}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Location"
                      variant="outlined"
                      name="location"
                      value={this.state.location}
                      onChange={this.onChange}
                      className={'gridWidth gridmargin'}
                    />
                  </Grid>
                </Grid>
                <Grid item sm={4} xs={12}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <h3>Book Cover</h3>
                    <img
                      // alt="book cover"
                      style={{
                        height: '170px',
                        width: '170px',
                        marginBottom: '15px',
                      }}
                      src={this.state.bookimg}
                    />
                    <input type="file" onChange={(e) => this.selectImage(e)} />
                    <TextField
                      required
                      multiline
                      label="Summary"
                      variant="outlined"
                      name="summary"
                      value={this.state.summary}
                      onChange={this.onChange}
                      rows={4}
                      className={'gridWidth gridmargin'}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button
                  style={{ width: '350px', marginTop: '50px' }}
                  variant="outlined"
                  type="submit"
                  // onClick={(e) => this.onSubmit(e)}
                >
                  Add Book
                </Button>
              </Grid>
            </form>
          </Grid>
        </div>
      </div>
    );
  }
}
