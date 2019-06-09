import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Media from "./Media";
import Cookies from 'universal-cookie';

const MEDIAS_API_URL = "/api/omdb/imdb/ ";
const USERS_URL = "/api/users";

const cookies = new Cookies();

class UserProfile extends Component {


    fetchData = () => {
        const urls = [
          MEDIAS_API_URL + "tt0848228",
          MEDIAS_API_URL + "tt0848228",
          MEDIAS_API_URL + "tt0848228",
          MEDIAS_API_URL + "tt0848228"
        ];
      
        const allRequests = urls.map(url => 
          fetch(url).then(response => response.json())
        );
      
        return Promise.all(allRequests);
      };


    state = {
        users: [],
        userId: 1,
        username: null,
        runtime: 0,
        listMediaId: [],
        listMedias: []
    };
    constructor(props) {
        super(props);


    }

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

    /*fct(tab) {
        let results = []
        let z = tab.map(e => {
            fetch("/api/omdb/imdb/" + e).then(t =>
                results.push(t)
            ).catch(e => console.log(e))
        });
        return results
    }*/

    fct(tab) {
        let results = []
        tab.map(e => {
            let x = fetch("/api/omdb/imdb/" + e).then(response => 
                response.json().then(
                    jsonResponse => 
                    results.push(jsonResponse)
                )
            )
        })
        console.log(results);
        return results
    }

    componentDidMount() {

        /*this.setState(state => ({
            userId: cookies.get('phpMyAdmin')
        }));*/

        this.fetchData().then(arrayOfResponses => 
            this.setState({
                listMedias : arrayOfResponses
            })
          );

        console.log("Cookie value: " + this.state.userId);

        fetch(`${USERS_URL}/${this.state.userId}`)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    username: jsonResponse.username,
                    listMediaId: jsonResponse.movieList,
                    runtime: jsonResponse.runtime
                })
            });
        /*var promises = this.state.listMediaId.reverse().map(function (val, i) {
            return fetch(MEDIAS_API_URL + val).then(function (result) {
                console.log(result);
                return result; // here, return whatever you want to be made available to the caller.
            });
        });*/

        /*let results = [];
        this.state.listMediaId.forEach(imdbId =>
            fetch(`${MEDIAS_API_URL}/${imdbId}`)
                .then(response => response.json())
                .then(jsonResponse => {
                    // do something with the data
                    results.push(jsonResponse);
                    console.log(jsonResponse)
                }).then(console.log(results))
        )*/

    }

   


    render() {
        let testlist =  async => {
            this.fct(this.state.listMediaId).then(medias => {
    
                return medias.map((media, index) => (
                    <h2> {media.Title}</h2>
                ))
    
            })
        };

        const { users } = this.state;

        const { username, runtime, listMediaId, listMedias } = this.state;

        const mediaList = listMedias.length ? (
            listMedias.map(media => {
                return <div className="media" key={media.id}><p>Title: {media.Title} Id: {media.id}</p></div>
            })
        ) : (
                <div className="center">NO users yet</div>
            );

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
                    {testlist}
                    <div id="user-profile">

                        <div className="users">
                            <h4>{username}</h4>

                            <h4>This is your stat: {runtime} !!!</h4>

                        </div>

                        {mediaList}
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



export default UserProfile