import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import cookie from 'react-cookies'
import { Redirect } from 'react-router-dom'

const USERS_URL = "/api/users/";
class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            logged: false,
            redirect: false
        };
    }

    logout(e) {
        //e.preventDefault();
        cookie.remove('walidb')
        this.setState = {
            username: "",
            logged: false,
            redirect: true
        }
        window.location.reload();
      }

      renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
    let userId = cookie.load('walidb')
    if(userId){
        if(!this.state.logged) {
            fetch(USERS_URL + userId).then( response =>
                response.json().then(jsonObj => {
                    this.setState({
                        username: jsonObj.username,
                        logged: true
                    })
                })
            )
        }
    }
/*
    function ActionLink() {
        function logout(e) {
          e.preventDefault();
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH")
          cookie.remove('walidb')
          this.setState = {
              username: "",
              logged: false
          }
        }
    }*/

    if(this.state.redirect){
        this.renderRedirect()
    }
      

    let userMsg = this.state.logged ? "Hi, " + this.state.username : ""
    
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/profile">{userMsg}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <Link to="/" className="nav-item nav-link active" >Home <span className="sr-only">(current)</span></Link>
                    {!this.state.logged ? <NavLink to="/login" className="nav-item nav-link" >Login</NavLink> :
                 <NavLink to="/" className="nav-item nav-link" onClick={e => this.logout(e)}>Logout</NavLink>}
                 {this.state.logged ? "" : <NavLink to="/register" className="nav-item nav-link" >Register</NavLink>}
                    <NavLink to="/profile" className="nav-item nav-link" >Profile</NavLink>

        </div>
            </div>
        </nav>
    )}
}

export default Navbar