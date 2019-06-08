import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

const USERS_URL = "/api/users";
const USER_URL = "/api/users";


var user = {
    basicInfo: {
        name: "Aurelien",
        gender: "Male",
        birthday: "April 3, 1995",
        location: "Switzerland",
        photo: "http://lorempixel.com/500/500/people",
        bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat fugit quia pariatur est saepe necessitatibus, quibusdam reiciendis ratione voluptate atque in qui provident rem repellat soluta. Blanditiis repellat velit eligendi."
    }
}

class UserProfile extends Component {

    state = {
        users: [ ]
    };
    state2 = {
        user: ""
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
        fetch(`${USERS_URL}/testuser`)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    user: jsonResponse
                })
            })
    }


    render() {

        const { users } = this.state;

        const userList = users.length ? (
            users.map(user => {
                return <div className="user" key={user.id}><p>Username: {user.username}</p></div>
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



                    <div id="user-profile">
                        <MainPanel info={user.basicInfo} />
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
        <h2>{info.name}</h2>
        <h3>{info.location}</h3>

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