import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar';

export default class Addbook extends Component {
    render() {
        return (
          <div>
            <Sidebar role="admin" selected="add_book" />
            <h2>Add book page</h2>
          </div>
        );
    }
}
