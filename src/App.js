import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './pages/Login';

//admin pages
import Admindashboard from './pages/admin/Admindashboard';
import Addbook from './pages/admin/Addbook';
import Borrowbook from './pages/admin/Borrowbook';

//student pages 
import Studentdashboard from './pages/student/Dashboard/Studentdashboard';
import SearchBook from './pages/student/SearchBook/SearchBook';
import LibrarianDashboard from "./pages/librarian/LibrarianDashboard";
import BorrowHistoryPage from "./pages/student/BorrowHistory/BorrowHistoryPage";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}

        <div className="container">
          <Route exact path="/" component={Login} />

          {/* admin paths */}
          <Route exact path="/admindashboard" component={Admindashboard} />
          <Route exact path="/add_book" component={Addbook} />
          <Route exact path="/borrowbook" component={Borrowbook} />
          <Route exact path="/searchbook" component={SearchBook}/>
          {/* student paths */}
          <Route exact path="/studentdashboard" component={Studentdashboard} />
          <Route exact path="/borrowhistory" component={BorrowHistoryPage}/>
          {/*<Route exact path="/librarian-dashboard" component={LibrarianDashboard}></Route>*/}
        </div>
      </div>
    </Router>
  );
}

export default App;
