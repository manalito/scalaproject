import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Statistics from './Statistics'
import Chart from "./Chart";
import Cookies from 'js-cookie'

const MEDIAS_API_URL = "/api/omdb/man"; // random URL for test

const USERS_URL = "/api/users";
const USER_URL = "/api/users";


class UserProfile extends Component {

    state = {
        users: [ ],
        userId: Cookies.get("walidb"),
        user: {
            username: null,
            photo: "http://lorempixel.com/500/500/people",
            stat: null,
            bio: "I am a movies lover !",
            listMediaId: []
        }
    };
    /*componentDidMount() {
        fetch(USERS_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    users: jsonResponse
                })
            })
    }*/

    componentDidMount() {
        fetch(`${USERS_URL}/${this.state.userId}`)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState(state => ({
                    username: jsonResponse.username,
                    stat: jsonResponse.stat
                    }))
            })
    }


    render() {

        const { users } = this.state;

        const userList = users.length ? (
            users.map(user => {
                return <div className="user" key={user.id}><p>Username: {user.username} Id: {user.id}</p></div>
            })
        ) : (
            <div className="center">NO users yet</div>
        );
        return (
            <Router>
                <div>
                        <h2>Welcome to your profile {}</h2>

                        <div className="users">
                            {userList}
                        </div>


                    <div className="container">
                        <div id="user-profile">
                            <h4>{this.state.user.username}</h4>
                            <h4>{this.state.user.stat}</h4>

                            <MainPanel info={this.state.user} />

                        <div>
                        <Statistics text={"hello"}/>
                        </div>
                    </div>
                </div>
        </div>

        </Router>

        )
    }
}


class Avatar extends React.Component {
    render() {
        var image = this.props.image,
            style = {
                width: this.props.width || 50,
                height: this.props.height || 50
            };

        if (!image) return null;

        return (
            <div className="avatar" style={style}>
            <img src={this.props.image} />
        </div>
    );
    }
}

class MainPanel extends React.Component {
    render() {
        var info = this.props.info;
        if (!info) return null;

        return (
            <div>
            <div className="top">
            <Avatar
        image={info.photo}
        width={100}
        height={100}
        />
        <h2>{info.username}</h2>

        <hr />
        <p>{info.gender} | {info.birthday}</p>
        </div>

        <div className="bottom">
            <h4>Biography</h4>
            <p>{info.bio}</p>
        </div>
        </div>
    );
    }
}




export default UserProfile