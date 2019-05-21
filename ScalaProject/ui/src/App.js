import React, {useReducer, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Client from "./Client";

import reactLogo from './images/react.svg';
import playLogo from './images/play.svg';
import scalaLogo from './images/scala.png';

import './App.css';

import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";
import Logo from "./components/Logo";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // random URL for test

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
};


const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case "SEARCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case "SEARCH_MOVIES_FAILURE":
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
const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);


      useEffect(() => {
          fetch(MOVIE_API_URL)
              .then(response => response.json())
              .then(jsonResponse => {
                  dispatch({
                      type: "SEARCH_MOVIES_SUCCESS",
                      payload: jsonResponse.Search
                  });
              });
      }, []);

      const search = searchValue => {
          dispatch({
              type: "SEARCH_MOVIES_REQUEST" });
          fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
              .then(response => response.json())
              .then(jsonResponse => {
                  if (jsonResponse.Response === "True") {
                      dispatch({
                          type: "SEARCH_MOVIES_SUCCESS",
                          payload: jsonResponse.Search
                      });
                  } else {
                      dispatch({
                          type: "SEARCH_MOVIES_FAILURE",
                          error: jsonResponse.Error
                      });
                  }
              });
      };


      const { movies, errorMessage, loading } = state;



        return (
            <Router>

                <div className="App">
                    <Logo/>
                    <Header text="HOOKED"/>
                    <Search search={search}/>
                    <p className="App-intro">Sharing a few of our favourite movies</p>
                    <div className="movies">
                        {loading && !errorMessage ? (
                            <span>loading... </span>
                        ) : errorMessage ? (
                            <div className="errorMessage">{errorMessage}</div>
                        ) : (
                            movies.map((movie, index) => (
                                <div className="container">
                                    <Movie key={`${index}-${movie.Title}`} movie={movie}/>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </Router>
        );

}
export default App;
