import React from 'react';
import StudentBoilerplate from "../StudentBoilerplate";
import {useSnackbar} from "notistack";
import jwt_decode from "jwt-decode";
import axios from "axios";
import EnhancedTable from "../../../components/EnhancedTable";

const CompletedReservation = () => {
    const [bookRequests, setBookRequests] = React.useState([]);
    const {enqueueSnackbar} = useSnackbar();

    React.useEffect(() => {
        if (localStorage.usertoken) {
            var token = localStorage.usertoken;
            var decoded = jwt_decode(token);
            retrieveData(decoded.id);
        }
    },[]);

    const headCells = [
        {id: 'id', numeric: true, disablePadding: false, label: 'Book Title'},
        {id: 'bookId', numeric: true, disablePadding: false, label: 'Book ID'},
        {id: 'bookimg', numeric: false, type: 'img', disablePadding: false, label: 'Book Cover'},
        {id: 'requestCreatedDate', numeric: false, type: 'date', disablePadding: false, label: 'Created Date'},
        {id: 'status', numeric: false, disablePadding: false, label: 'Status'},
    ];

    const retrieveData = (userId) => {
        axios.post('book-request/find-completed-book-reservation-by-user-id', {userId}).then(result => {
            setBookRequests(result.data);
        }).catch(err => {
            enqueueSnackbar('Error occured. Please Try Again Later', {variant: 'error', transitionDuration: 1000});
        });
    };

    return (
        <div>
            <h2>Completed Reservation</h2>
            <EnhancedTable
                headCells={headCells}
                rows={bookRequests}
                disableToolbar
            />
        </div>

    );
};


const PendingReservationPage = () => {
    const [bookRequests, setBookRequests] = React.useState([]);
    const {enqueueSnackbar} = useSnackbar();

    React.useEffect(() => {
        if (localStorage.usertoken) {
            var token = localStorage.usertoken;
            var decoded = jwt_decode(token);
            retrieveData(decoded.id);
        }
    },[]);

    const headCells = [
        {id: 'id', numeric: true, disablePadding: false, label: 'Book Title'},
        {id: 'bookId', numeric: true, disablePadding: false, label: 'Book ID'},
        {id: 'bookimg', numeric: false, type: 'img', disablePadding: false, label: 'Book Cover'},
        {id: 'requestCreatedDate', numeric: false, type: 'date', disablePadding: false, label: 'Created Date'},
        {id: 'status', numeric: false, disablePadding: false, label: 'Status'},
    ];

    const retrieveData = (userId) => {
        axios.post('book-request/find-book-reservation-by-user-id', {userId}).then(result => {
            setBookRequests(result.data);
        }).catch(err => {
            enqueueSnackbar('Error occured. Please Try Again Later', {variant: 'error', transitionDuration: 1000});
        });
    };

    return (
        <div>
            <StudentBoilerplate page={'reservation'}/>
            <div className="content">
                <h2>Pending Reservation</h2>
                <EnhancedTable
                    headCells={headCells}
                    rows={bookRequests}
                    disableToolbar
                />
                <CompletedReservation/>
            </div>
        </div>
    );
};

export default PendingReservationPage;