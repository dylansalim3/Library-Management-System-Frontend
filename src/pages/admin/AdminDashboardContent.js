import React from 'react';
import {makeStyles, Paper, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import axios from "axios";
import Grid from "@material-ui/core/Grid/Grid";
import studentIcon from "./../../images/student.svg";
import teacherIcon from "./../../images/teacher.svg";
import expiredBookIcon from "./../../images/expired-book.png";
import returnBookIcon from "./../../images/return-book.png";
import Table from "@material-ui/core/Table/Table";
import Button from "@material-ui/core/Button/Button";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Clear} from "@material-ui/icons";
import TableContainer from "@material-ui/core/TableContainer/TableContainer";
import moment from "moment";
import TableSortLabel from "@material-ui/core/TableSortLabel/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import EnhancedTable from "../../components/EnhancedTable";


const useStyle = makeStyles({
    card: {
        minWidth: 200,
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    gridContainer: {
        flexGrow: 1,
    },
    typographyCardTitle: {
        fontSize: 14,
        color: '#D3D3D3',
    },
    typographyCardContentText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});



const AdminDashboardContent = () => {
    const classes = useStyle();
    const [studentCount, setStudentCount] = React.useState(0);
    const [teacherCount, setTeacherCount] = React.useState(0);
    const [overdueBookCount, setOverdueBookCount] = React.useState(0);
    const [booksBorrowed, setBooksBorrowed] = React.useState(0);
    const [notifications, setNotifications] = React.useState([]);
    const overviewItem = [
        {title: 'No. of students', detail: studentCount, icon: studentIcon},
        {title: 'No. of staff', detail: teacherCount, icon: teacherIcon},
        {title: 'No. of books overdue', detail: overdueBookCount, icon: expiredBookIcon},
        {title: 'No. of books borrowed this month', detail: booksBorrowed, icon: returnBookIcon}
    ];

    const headCells = [
        { id: 'id', numeric: false, disablePadding: true, label: 'No' },
        { id: 'title', numeric: false, disablePadding: false, label: 'Message' },
        { id: 'user_id', numeric: false, disablePadding: false, label: 'Receiver' },
        { id: 'created', numeric: false, disablePadding: false, label: 'Date' },
    ];



    React.useEffect(() => {
        axios.post('/dashboard/admin-dashboard').then(result => {
            const apiResult = result.data;
            setStudentCount(apiResult.studentCount);
            setTeacherCount(apiResult.teacherCount);
            setOverdueBookCount(apiResult.overdueBookCount);
            setBooksBorrowed(apiResult.booksCurrentBorrowed);
        });
        axios.post('/notification/get-all-notifications').then(result => {
            setNotifications(result.data);
        });
    }, []);

    return (
        <div>
            <h1>Overview</h1>
            <Grid container className={classes.gridContainer} spacing={2}>
                {overviewItem.map(item => (
                    <Grid item md={6} lg={3}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContainer}>
                                <div>
                                    <Typography className={classes.typographyCardTitle}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="h4">
                                        {item.detail}
                                    </Typography>
                                </div>
                                <img src={item.icon} height="60px" width="60px" alt="icon"/>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}

            </Grid>
            <h1>Notification & Reminder</h1>
            <p>This section contains notifications and reminder sent by Admin</p>
            <EnhancedTable headCells={headCells} rows={notifications}/>
            {/*<TableContainer component={Paper}>*/}
                {/*<Table>*/}
                    {/*<TableHead>*/}
                        {/*<TableRow>*/}
                            {/*<TableCell align="center">No</TableCell>*/}
                            {/*<TableCell align="center">Message</TableCell>*/}
                            {/*<TableCell align="center">Receiver</TableCell>*/}
                            {/*<TableCell align="center">Date</TableCell>*/}
                        {/*</TableRow>*/}
                    {/*</TableHead>*/}

                    {/*<TableBody>*/}
                        {/*{notifications.length > 0 ? notifications.map((notification, index) => (*/}
                            {/*<TableRow key={notification.id}>*/}
                                {/*<TableCell align="center">{index + 1}</TableCell>*/}
                                {/*<TableCell align="center">{notification.title}</TableCell>*/}
                                {/*<TableCell align="center">{notification.user_id}</TableCell>*/}
                                {/*<TableCell*/}
                                    {/*align="center">{moment(notification.created).format("DD-MMM-YYYY")}</TableCell>*/}
                            {/*</TableRow>*/}
                        {/*)) : ''}*/}
                    {/*</TableBody>*/}
                {/*</Table>*/}
            {/*</TableContainer>*/}
        </div>
    );
};



export default AdminDashboardContent;