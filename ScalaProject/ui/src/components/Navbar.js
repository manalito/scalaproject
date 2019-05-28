import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">{props.text}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <Link to="/" className="nav-item nav-link active" >Home <span className="sr-only">(current)</span></Link>
                    <NavLink to="/" className="nav-item nav-link" >Features</NavLink>
                    <NavLink to="/profile" className="nav-item nav-link" >User Profile</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar