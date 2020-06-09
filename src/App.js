import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './pages/Login';

//admin pages
import Admindashboard from './pages/admin/Admindashboard';
import Addbook from './pages/admin/Addbook';
import Borrowbook from './pages/admin/BorrowReturnRenew/Borrowbook';
import axios from 'axios';

//student pages 
import Studentdashboard from './pages/student/Dashboard/Studentdashboard';
import SearchBook from './pages/student/SearchBook/SearchBook';
import LibrarianDashboard from "./pages/librarian/LibrarianDashboard";
import BorrowHistoryPage from "./pages/student/BorrowHistory/BorrowHistoryPage";
import AccountRegistrationPage from "./pages/admin/AccountRegistration/AccountRegistrationPage";
import Registration from "./pages/Registration";
axios.defaults.baseURL = 'http://localhost:3000';
function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}

        <div className="container">
          <Route exact path="/" component={Login} />

          {/*registration*/}
          <Route exact path="/account-registration/:hash" component={Registration}/>
          {/* admin paths */}
          <Route exact path="/admindashboard" component={Admindashboard} />
          <Route exact path="/add_book" component={Addbook} />
          <Route exact path="/borrowbook" component={Borrowbook} />
          <Route exact path="/searchbook" component={SearchBook}/>
          <Route exact path="/registration" component={AccountRegistrationPage}/>
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
