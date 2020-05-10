import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Sidemenu from './components/Sidemenu';
//admin pages
import Admindashboard from './pages/admin/Admindashboard';
import Addbook from './pages/admin/Addbook';

//student pages 
import Studentdashboard from './pages/student/Studentdashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/sidemenu" component={Sidemenu} />

          {/* admin paths */}
          <Route exact path="/admindashboard" component={Admindashboard} />
          <Route exact path="/add_book" component={Addbook} />
          {/* student paths */}
          <Route exact path="/studentdashboard" component={Studentdashboard} />
        </div>
      </div>
    </Router>
  );
}

export default App;
