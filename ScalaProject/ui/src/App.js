import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

// import Client from "./Client";

import './App.css';

// import Header from "./components/Header";
import Home from "./components/Home";
import Logo from "./components/Logo";
import Navbar from "./components/Navbar"
import UserProfile from "./components/UserProfile"
import Login from "./components/Login"


/*class App extends Component {
  constructor(props) {
      super(props);
      this.state = {title: ''};
*/
const App = () => {

    /** <div className="content">
     <p className="App-intro">Sharing a few of our favourite medias</p>
     </div> **/

        return (
            <Router>
                <div className="App">
                    <Logo/>
                    <Navbar text="ScaleMedia" />
                    <Route exact path='/' component={Home} />
                    <Route path='/profile' component={UserProfile} />
                    <Route path='/login' component={Login} />

                </div>

            </Router>
        );

}
export default App;
