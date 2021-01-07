import React from 'react';
import jwt_decode from "jwt-decode";
import axios from "axios";
import StudentBoilerplate from "../StudentBoilerplate";
import EnhancedTable from "../../../components/EnhancedTable";
import {useSnackbar} from "notistack";
import {BORROW_BOOK_ROUTE} from "../../../constant/route.constant";
import CustomModal from "../../../components/CustomModal";
import {Grid, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";

const ExtendBorrowPage = () => {
    const [borrowBooks, setBorrowBooks] = React.useState([]);
    const [userId, setUserId] = React.useState(-1);
    const [openExtendBorrowReasonDialog, setOpenExtendBorrowReasonDialog] = React.useState(false);
    const [extendBorrowBookIdList, setExtendBorrowBookIdList] = React.useState([]);
    const {register, handleSubmit, watch, setValue, getValues, errors} = useForm();
    const {enqueueSnackbar} = useSnackbar();

    React.useEffect(() => {
        if (localStorage.usertoken) {
            var token = localStorage.usertoken;
            var decoded = jwt_decode(token);
            setUserId(decoded.id);
            retrieveData(decoded.id);
        }
    }, []);

    const retrieveData = (userId) => {
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

    const onExtendBorrowBtnClick = (idList) => {
        setExtendBorrowBookIdList(idList);
        setOpenExtendBorrowReasonDialog(true);
    };

    const submitSelection = () => {
        const reason = getValues("reason");
        axios.post('book-request/add-extend-book-request', {
            userId: userId,
            borrowBookIdList: extendBorrowBookIdList,
            url: BORROW_BOOK_ROUTE + "/2",
            reason,
        }).then(result => {
            enqueueSnackbar('Extend Borrow Request Sent', {variant: 'success', transitionDuration: 1000});
            retrieveData(userId);
            setOpenExtendBorrowReasonDialog(false);
        }).catch(err => {
            enqueueSnackbar('Error occured. Please Try Again Later', {variant: 'error', transitionDuration: 1000});
            setOpenExtendBorrowReasonDialog(false);
        });
    };

    const searchCriteria = ['title'];

    return (
        <div>
            <StudentBoilerplate page={'extendborrow'}/>
            <div className="content">
                <h2>Extend Borrow</h2>
                <EnhancedTable
                    headCells={headCells}
                    rows={borrowBooks}
                    actionButtonText="Extend Borrow"
                    onDeleteSelection={onExtendBorrowBtnClick}
                    searchCriteria={searchCriteria}
                />

                <CustomModal showAlertModal={openExtendBorrowReasonDialog}
                             title={"What is your reason to extend the book?"}
                             desc={
                                 <form id="extendBorrowReasonForm" onSubmit={handleSubmit(submitSelection)} noValidate
                                       autoComplete="off">
                                     <Grid container direction="row" justify="center">
                                         <Grid item xs={12} md={8}>
                                             <TextField
                                                 label="Extend Book Reason"
                                                 name="reason"
                                                 type="text"
                                                 inputRef={register({required: true})}
                                                 error={errors?.reason}
                                                 helperText={errors?.reason && "Invalid value"}
                                                 fullWidth
                                                 required
                                                 variant="outlined"
                                             />
                                         </Grid>
                                     </Grid>
                                 </form>
                             }
                             customActions={[
                                 <Button onClick={() => setOpenExtendBorrowReasonDialog(false)} color="warning">
                                     Close
                                 </Button>,
                                 <Button form="extendBorrowReasonForm" type="submit" color="primary">
                                     Submit
                                 </Button>]}/>
            </div>
        </div>
    );
};

export default ExtendBorrowPage;
