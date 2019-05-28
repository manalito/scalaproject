import React, {useReducer, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Client from "./Client";

import './App.css';

import Header from "./components/Header";
import Media from "./components/Media";
import Search from "./components/Search";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar"

const MEDIAS_API_URL = "/api/omdb/man"; // random URL for test

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
          fetch(`/api/omdb/${searchValue}`)
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

    /** <div className="content">
     <p className="App-intro">Sharing a few of our favourite medias</p>
     </div> **/

        return (
            <Router>

                <div className="App">
                    <Logo/>
                    <Navbar text="ScaleMedia" />
                    <Search search={search}/>



                    <div className="medias">
                        {loading && !errorMessage ? (
                            <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                            </div>
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
