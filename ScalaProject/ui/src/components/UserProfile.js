import React, {useReducer, useEffect} from 'react';
import Search from "./Search";
import {BrowserRouter as Router} from "react-router-dom";

const USERS_URL = "http://localhost:9000/users"; // random URL for test

const initialState = {
    loading: true,
    users: [],
    errorMessage: null
};


const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_USERS_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case "FETCH_USERS_SUCCESS":
            return {
                ...state,
                loading: false,
                medias: action.payload
            };
        case "FETCH_USERS_FAILURE":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        default:
            return state;
    }
};


const Tech = ({ match }) => {
    return <div>Current Route: {match.params.tech}</div>
};


/*class App extends Component {
  constructor(props) {
      super(props);
      this.state = {title: ''};
*/
const UserProfile = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        fetch(USERS_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                dispatch({
                    type: "FETCH_USERS_SUCCESS",
                    payload: jsonResponse
                });
            });
    }, []);

    const search = searchValue => {
        dispatch({
            type: "FETCH_USERS_REQUEST" });
        fetch(`/user/${searchValue}`)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === "True") {
                    dispatch({
                        type: "FETCH_USERS_SUCCESS",
                        payload: jsonResponse.Search
                    });
                } else {
                    dispatch({
                        type: "FETCH_USERS_FAILURE",
                        error: jsonResponse.Error
                    });
                }
            });
    };


    const { users, errorMessage, loading } = state;


    return (
        <Router>
            <div>
                <Search search={search}/>

                <h2>List of user profiles</h2>

                <div className="users">
                    {loading && !errorMessage ? (
                        <div className="spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>
                    ) : errorMessage ? (
                        <div className="errorMessage">{errorMessage}</div>
                    ) : (
                        users.map((user) => (
                            <div className="container">
                                <p key={`${user.id}`}>${user.username}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </Router>
    )
}

export default UserProfile