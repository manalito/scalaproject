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
import Media from "./components/Media";
import Search from "./components/Search";
import Logo from "./components/Logo";

const MEDIAS_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // random URL for test

const initialState = {
    loading: true,
    medias: [],
    errorMessage: null
};


const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MEDIAS_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case "SEARCH_MEDIAS_SUCCESS":
            return {
                ...state,
                loading: false,
                medias: action.payload
            };
        case "SEARCH_MEDIAS_FAILURE":
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
          fetch(MEDIAS_API_URL)
              .then(response => response.json())
              .then(jsonResponse => {
                  dispatch({
                      type: "SEARCH_MEDIAS_SUCCESS",
                      payload: jsonResponse.Search
                  });
              });
      }, []);

      const search = searchValue => {
          dispatch({
              type: "SEARCH_MEDIAS_REQUEST" });
          fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
              .then(response => response.json())
              .then(jsonResponse => {
                  if (jsonResponse.Response === "True") {
                      dispatch({
                          type: "SEARCH_MEDIAS_SUCCESS",
                          payload: jsonResponse.Search
                      });
                  } else {
                      dispatch({
                          type: "SEARCH_MEDIAS_FAILURE",
                          error: jsonResponse.Error
                      });
                  }
              });
      };


      const { medias, errorMessage, loading } = state;



        return (
            <Router>

                <div className="App">
                    <Logo/>
                    <Header text="HOOKED"/>
                    <Search search={search}/>
                    <p className="App-intro">Sharing a few of our favourite medias</p>
                    <div className="medias">
                        {loading && !errorMessage ? (
                            <span>loading... </span>
                        ) : errorMessage ? (
                            <div className="errorMessage">{errorMessage}</div>
                        ) : (
                            medias.map((media, index) => (
                                <div className="container">
                                    <Media key={`${index}-${media.Title}`} media={media}/>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </Router>
        );

}
export default App;
