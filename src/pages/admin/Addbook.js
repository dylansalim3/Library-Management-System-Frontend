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
  };

  uploadBook = async (imageFormObj) => {
    await this.uploadImage(imageFormObj);
    console.log(this.state.bookimgpath);
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
      })
      .catch((err) => {
        console.log(err);
      });
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

        <div className="content">
          <Grid container>
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
                    label="Author"
                    variant="outlined"
                    name="author"
                    value={this.state.author}
                    onChange={this.onChange}
                    value="Need to input manually for now"
                    className={'gridWidth gridmargin'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                  <TextField
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
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                  <TextField
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
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
                    alt="book cover"
                    style={{ height: '170px', width: '170px' }}
                    src={this.state.bookimg}
                  />
                  <input type="file" onChange={(e) => this.selectImage(e)} />
                  <TextField
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
                style={{ width: '250px', marginTop: '25px' }}
                variant="outlined"
                type="submit"
                onClick={(e) => this.onSubmit(e)}
              >
                Add Book
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
