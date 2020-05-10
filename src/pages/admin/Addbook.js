import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import jwt_decode from 'jwt-decode';
import '../../style/Style.css';

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
      // checkimg: URL.createObjectURL('/uploads/1589127663081ironman-left.jpg'),
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

  uploadImage = async(imageFormObj) =>{
    await axios.post('/file',imageFormObj)
    .then(data=>{
      console.log(data.data);
      this.setState({
        bookimgpath: data.data
      })
      return(data.data);
    })
    .catch(err=>{
      console.log(err);
      return;
    });
  }

  uploadBook = async(imageFormObj) =>{
    await this.uploadImage(imageFormObj);
    console.log(this.state.bookimgpath);
    axios.post('/books/add',{
      title: "new book la",
      bookimg: this.state.bookimgpath
    })
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  onSubmit = async(e) => {
    e.preventDefault();
    let imageFormObj = new FormData();
    imageFormObj.append('file', this.state.bookcover);
    this.uploadBook(imageFormObj);
    
  };

  render() {
    return (
      <div>
        <Sidebar
          role={this.state.role}
          user={this.state.first_name}
          selected="add_book"
        />
        <div className="content">
          <h1>Add Book</h1>
          {/* <form action="/file" method="post" enctype="multipart/form-data">
            <input type="file" name="bookcover" />
          </form>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" style={{ display: 'none' }} />
          </Button> */}
          <img style={{ maxWidth: '200px' }} src={this.state.bookimg} />
          <input type="file" onChange={(e) => this.selectImage(e)} />
          <button type="submit" onClick={(e) => this.onSubmit(e)}>
            Upload
          </button>
        </div>
      </div>
    );
  }
}
