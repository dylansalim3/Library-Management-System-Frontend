import React from 'react';
import axios from "axios";
import BookSearchResult from "../pages/student/SearchBook/BookSearchResult";

const NewArrivalBook = () => {
    const [newArrivalBooks, setNewArrivalBooks] = React.useState([]);

    React.useEffect(() => {
        axios.get('book-details/get-latest-book').then(result => {
            setNewArrivalBooks(result.data);
        });
    }, []);
    return (
        <div style={{padding:"30px"}}>
            {newArrivalBooks.length > 0 ? (
                <BookSearchResult title="New Arrival" result={newArrivalBooks}/>
            ) : ""
            }
        </div>
    );
};

export default NewArrivalBook;
