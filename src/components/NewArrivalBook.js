import React from 'react';
import axios from "axios";
import BookSearchResult from "../pages/student/SearchBook/BookSearchResult";
import jwt_decode from "jwt-decode";

const NewArrivalBook = () => {
    const [newArrivalBooks, setNewArrivalBooks] = React.useState([]);

    React.useEffect(() => {
        axios.get('book-details/get-latest-book').then(result => {
            setNewArrivalBooks(result.data);
        });
    }, []);
    return (
        <div>
            {newArrivalBooks.length > 0 ? (
                <BookSearchResult title="New Arrival" result={newArrivalBooks}/>
            ) : ""
            }
        </div>
    );
};

export default NewArrivalBook;
