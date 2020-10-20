import React from 'react';
import borrowBookIcon from "../../../images/borrow-book.png";
import bookStackIcon from "../../../images/book-stack.png";
import expiredBookIcon from "../../../images/expired-book.png";
import bookShelfIcon from "../../../images/book-shelf.png";
import DashboardCards from "../../../components/DashboardCards";
import axios from "axios";
import BookSearchResult from "../SearchBook/BookSearchResult";

const overviewItems = [
    {title: 'No. of books currently on loan', detail: 3, icon: borrowBookIcon},
    {title: 'No. of books borrowed this month', detail: 4, icon: bookStackIcon},
    {title: 'No. of books overdue', detail: 2, icon: expiredBookIcon},
    {title: 'No. of books added this week', detail: 1, icon: bookShelfIcon}
];

const StudentDashboardContent = () => {
    const [newArrivalBooks,setNewArrivalBooks] = React.useState([]);


    React.useEffect(()=>{
        axios.get('book-details/get-latest-book').then(result=>{
            setNewArrivalBooks(result.data);
        });
    },[]);

    return (
        <div>
            <h1>Overview</h1>
            <DashboardCards overviewItems={overviewItems}/>
            {newArrivalBooks.length>0 ? (
                <BookSearchResult title="New Arrival" result={newArrivalBooks}/>
            ) : ""
            }
        </div>
    );
};

export default StudentDashboardContent;