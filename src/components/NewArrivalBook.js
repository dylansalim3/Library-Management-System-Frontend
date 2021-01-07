import React from 'react';
import axios from "axios";
import LatestBookResult from "../pages/student/SearchBook/LatestBookResult";

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
                <LatestBookResult title="New Arrival" result={newArrivalBooks}/>
            ) : ""
            }
        </div>
    );
};

export default NewArrivalBook;
