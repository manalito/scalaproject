import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Media from "./Media";
import Cookies from 'universal-cookie';

const MEDIAS_API_URL = "/api/omdb/imdb/";
const USERS_URL = "/api/users";

const cookies = new Cookies();

class UserProfile extends Component {


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

    fetchData = () => {
        const urls = this.state.listMediaId.map(mediaId => MEDIAS_API_URL + mediaId);
      
        const allRequests = urls.map(url => 
          fetch(url).then(response => response.json())
        );
      
        return Promise.all(allRequests);
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

    /*fct(tab) {
        let results = []
        let z = tab.map(e => {
            fetch("/api/omdb/imdb/" + e).then(t =>
                results.push(t)
            ).catch(e => console.log(e))
        });
        return results
    }*/

    componentDidMount() {

        /*this.setState(state => ({
            userId: cookies.get('phpMyAdmin')
        }));*/

        

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

                this.fetchData().then(arrayOfResponses => 
                    this.setState({
                        listMedias : arrayOfResponses
                    })
                  );
            });

    }

   


    render() {

        const { users } = this.state;

        const { username, runtime, listMedias } = this.state;

        const mediaList = listMedias.length ? (
            listMedias.map((media, index) => {
                //return <div className="media" key={media.id}><p>Title: {media.Title} Id: {media.id}</p></div>
                return <div className="container">
                <Media key={`${index}-${media.Title}`} media={media}/>
            </div>
            })
        ) : (
                <div className="center">No media yet</div>
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
                    <div id="user-profile">

                        <div className="users">
                            <h4>{username}</h4>

                            <h4>This is your stat: {runtime} !!!</h4>

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