import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Media from "./Media";
import cookie from 'react-cookies';

const MEDIAS_API_URL = "/api/omdb/imdb/";
const USERS_URL = "/api/users";

class UserProfile extends Component {


    state = {
        users: [],
        userId: 0,
        username: null,
        runtime: 0,
        listMediaId: [],
        listMedias: [],
        loaded: false
    };

    constructor(props) {
        super(props);
    }

    fetchData = () => {
        const urls = this.state.listMediaId.map(mediaId => MEDIAS_API_URL + mediaId);
      
        const allRequests = urls.map(url => 
          fetch(url).then(response => response.json())
        );
      
        return Promise.all(allRequests);
      };



    componentDidMount() {

        /*this.setState({
            userId : cookie.load('walidb')
        })*/

        /*fetch(`${USERS_URL}/${this.state.userId}`)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    username: jsonResponse.username,
                    listMediaId: jsonResponse.movieList,
                    runtime: jsonResponse.runtime
                })

                this.fetchData().then(arrayOfResponses => 
                    this.setState({
                        listMedias : arrayOfResponses
                    })
                  );
            });*/
        

    }

    componentDidUpdate(prevProps) {

        if (this.state.userId === undefined || this.state.userId === 0 ) {
            this.setState({
                userId: cookie.load('walidb')
            })
        } /*
        if (this.state.userId == 0) {
            this.setState({
                userId: cookie.load('walidb')
            })
        } */
        
        if(!this.state.loaded){
            fetch(`${USERS_URL}/${this.state.userId}`)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    username: jsonResponse.username,
                    listMediaId: jsonResponse.movieList,
                    runtime: jsonResponse.runtime
                })

                this.fetchData().then(arrayOfResponses =>
                    this.setState({
                        listMedias: arrayOfResponses,
                        loaded: true
                    }),
                    cookie.save('imdbArray', JSON.stringify(this.state.listMediaId))
                );
            });
        }

    }

    convertTime(time) {
        return Math.floor(time/60) + ' hours ' + time%60 + ' minutes'
    }


    render() {

        if (this.state.userId === undefined || this.state.userId === 0 ) {
            this.setState({
                userId: cookie.load('walidb')
            })
        } 
        console.log("Cookie value: " + this.state.userId);

        const { username, runtime, listMedias } = this.state;

        const mediaList = listMedias.length ? (
            listMedias.map((media, index) => {
                return <div className="container">
                <Media key={`${index}-${media.Title}`} media={media}/>
            </div>
            })
        ) : (
                <div className="center">No media yet</div>
            );

       /* const userList = users.length ? (
            users.map(user => {
                return <div className="user" key={user.id}><p>Username: {user.username} Id: {user.id}</p></div>
            })
        ) : (
                <div className="center">NO users yet</div>
        );*/
        return (
            <Router>
                <div>
                    <h2>Welcome to your profile {}</h2>
                    <div id="user-profile">

                        <div className="users">
                            <h4>{username}</h4>

                            <h4>Time spent: {this.convertTime(runtime)}</h4>

                        </div>

                        
                    </div>
                    {mediaList}
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



export default UserProfile