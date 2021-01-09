import React, {useState, useEffect} from 'react';
import axios from "axios";
// import BookSearchResult from "../pages/student/SearchBook/BookSearchResult";
import jwt_decode from "jwt-decode";
import LatestBookResult from '../pages/student/SearchBook/LatestBookResult';

const BookRecommendation = (props) => {
    const [bookRecommendations, setBookRecommendations] = useState([]);

    useEffect(() => {
        if (localStorage.usertoken) {
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            const userId = decoded.id;
            axios.post('/book-details/get-book-recommendation',{userId}).then(result => {
                console.log(result.data);
                setBookRecommendations(result.data);
            });
        }

    }, []);

    return (
      <div>
        {bookRecommendations.length > 0 ? (
          <LatestBookResult
            disabledReservation={props.disabledReservation}
            reserve={props.reserve}
            title="Book Recommendation"
            result={bookRecommendations}
          />
        ) : (
          ''
        )}
      </div>
    );
};

export default BookRecommendation;