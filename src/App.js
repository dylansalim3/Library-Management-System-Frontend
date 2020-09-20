import React, {useCallback} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './pages/Login';
import Profile from './pages/Profile';

//admin pages
import Admindashboard from './pages/admin/Admindashboard';
import Addbook from './pages/admin/Addbook';
import Borrowbook from './pages/admin/BorrowReturnRenew/Borrowbook';
import axios from 'axios';

//student pages
import Studentdashboard from './pages/student/Dashboard/Studentdashboard';
import SearchBook from './pages/student/SearchBook/SearchBook';
import BorrowHistoryPage from "./pages/student/BorrowHistory/BorrowHistoryPage";
import AccountRegistrationPage from "./pages/admin/AccountRegistration/AccountRegistrationPage";
import Registration from "./pages/Registration";
import StudentAccountRegistrationPage from "./pages/teacher/StudentAccountRegistrationPage";
import EditDeleteBookPage from "./pages/admin/EditDeleteBook/EditDeleteBookPage";
import RoleAssignmentPage from "./pages/admin/RoleAssignment/RoleAssignmentPage";
import EditLibraryMapPage from "./pages/admin/EditLibraryMap/EditLibraryMapPage";
import ViewLibraryMapPage from "./pages/student/ViewLibraryMap/ViewLibraryMapPage";
import BackupDatabasePage from "./pages/admin/BackupDatabase/BackupDatabasePage";
import usePushNotifications from "./UsePushNotifications";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
    const {
        userConsent,
        pushNotificationSupported,
        userSubscription,
        onClickAskUserPermission,
        onClickSusbribeToPushNotification,
        onClickSendSubscriptionToPushServer,
        pushServerSubscriptionId,
        onClickSendNotification,
        error,
        loading
    } = usePushNotifications();
  const init = useCallback(()=>{
      const isConsentGranted = userConsent === "granted";
      if (pushNotificationSupported && !isConsentGranted) {
          onClickAskUserPermission();
          if (userSubscription) {
              onClickSusbribeToPushNotification();
              if (!pushServerSubscriptionId) {
                  onClickSendSubscriptionToPushServer();
              }
          }
      }
      console.log(pushNotificationSupported, isConsentGranted, userSubscription, pushServerSubscriptionId);

  },[])
    return (
        <Router>
            <div className="App">
                {/* <Navbar /> */}

                <div className="container">
                    <Button variant={"outlined"} color={"primary"} onClick={()=>{
                        if(!pushServerSubscriptionId){
                            init();
                        }

                        onClickSendNotification();
                    }}>Send
                        Notification</Button>
                    <Route exact path="/" component={Login}/>

                    {/*registration*/}
                    <Route exact path="/account-registration/:hash" component={Registration}/>
                    <Route exact path="/profile" component={Profile}/>
                    {/* admin paths */}
                    <Route exact path="/admindashboard" component={Admindashboard}/>
                    <Route exact path="/add_book" component={Addbook}/>
                    <Route exact path="/borrowbook" component={Borrowbook}/>
                    <Route exact path="/searchbook" component={SearchBook}/>
                    <Route exact path="/registration" component={AccountRegistrationPage}/>
                    <Route exact path="/edit_book" component={EditDeleteBookPage}/>
                    <Route exact path={"/role_assignment"} component={RoleAssignmentPage}/>
                    <Route exact path="/library_map" component={EditLibraryMapPage}/>
                    <Route exact path="/backup_data" component={BackupDatabasePage}/>
                    {/* student paths */}
                    <Route exact path="/studentdashboard" component={Studentdashboard}/>
                    <Route exact path="/borrowhistory" component={BorrowHistoryPage}/>
                    <Route exact path='/view_library_map' component={ViewLibraryMapPage}/>
                    <Route exact path="/studentregistration" component={StudentAccountRegistrationPage}/>

                    {/*<Route exact path="/librarian-dashboard" component={LibrarianDashboard}></Route>*/}


                </div>
            </div>
        </Router>
    );
}

export default App;
