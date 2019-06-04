import React, {Component} from 'react';
import User from "./User";
import {BrowserRouter as Router} from "react-router-dom";
import Search from "./Search";

const USERS_URL = "/api/users"; // random URL for test


class UserProfile extends Component {

    state = {
        users: [ ]
    };

    componentDidMount() {
        fetch(USERS_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    users: jsonResponse
                })
            })
    }



    render() {

        const { users } = this.state;

        const userList = users.length ? (
            users.map(user => {
                return <div className="user" key={user.id}><p>{user.username}</p></div>
            })
        ) : (
            <div className="center">NO users yet</div>
        );
        return (
            <Router>
                <div>
                    <h2>List of user profiles</h2>

                    <div className="users">
                        {userList}
                    </div>
                </div>

            </Router>
        )
    }
}

export default UserProfile