import React from 'react';
import jwt_decode from "jwt-decode";
import axios from "axios";
import StudentBoilerplate from "../StudentBoilerplate";
import EnhancedTable from "../../../components/EnhancedTable";
import {useSnackbar} from "notistack";

const ExtendBorrowPage = () => {
    const [borrowBooks, setBorrowBooks] = React.useState([]);
    const [userId, setUserId] = React.useState(-1);
    const {enqueueSnackbar} = useSnackbar();

    React.useEffect(() => {
        if (localStorage.usertoken) {
            var token = localStorage.usertoken;
            var decoded = jwt_decode(token);
            setUserId(decoded.id);
            retrieveData(decoded.id);
        }
    }, []);

    const retrieveData = (userId) =>{
        axios.post('book-request/find-all-borrowed-books', {
            userId
        }).then(res => {
            console.log(res.data);
            setBorrowBooks(res.data);
        }).catch(err => {
            console.log(err.toString);
        });
    };


    const headCells = [
        {id: 'title', numeric: false, disablePadding: false, label: 'Book Title'},
        {id: 'bookId', numeric: false, disablePadding: false, label: 'Book ID'},
        {id: 'bookimg', numeric: false, type: 'img', disablePadding: false, label: 'Book Cover'},
        {id: 'borrowDate', numeric: false, type: 'date', disablePadding: false, label: 'Borrow Date'},
        {id: 'dueDate', numeric: false, type: 'date', disablePadding: false, label: 'Due Date'},
        {id: 'status', numeric: false, disablePadding: false, label: 'Status'},
    ];

    const submitSelection = (idList) => {
        console.log(idList);
        axios.post('book-request/add-extend-book-request', {userId: userId, borrowBookIdList: idList}).then(result => {
            enqueueSnackbar('Extend Borrow Request Sent', {variant: 'success', transitionDuration: 1000});
            retrieveData(userId);
        }).catch(err=>{
            enqueueSnackbar('Error occured. Please Try Again Later', {variant: 'error', transitionDuration: 1000});
        });
    };

    return (
        <div>
            <StudentBoilerplate page={'extendborrow'}/>
            <div className="content">
                <h2>Extend Borrow</h2>
                <EnhancedTable headCells={headCells} rows={borrowBooks} actionButtonText="Extend Borrow"
                               onDeleteSelection={submitSelection}/>
            </div>
        </div>
    );
};

export default ExtendBorrowPage;