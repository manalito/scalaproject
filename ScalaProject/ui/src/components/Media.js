import React, {Component} from "react";
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const DEFAULT_PLACEHOLDER_IMAGE =
    "./images/not-found.png";

const MEDIAS_URL = "/api/medias/";
const OMDB_URL = "/api/omdb/imdb/";

// Here it is a presentational component
// that renders the media title, image, and year.


class Media extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddedMedia: false,
            showDetails: false,
            mediaInfos: undefined

        };

        // This binding is necessary to make `this` work in the callback
        this.handleAddMedia = this.handleAddMedia.bind(this);
        // This binding is necessary to make `this` work in the callback
        this.handleShowDetails = this.handleShowDetails.bind(this);
    }

    handleAddMedia() {

        if(!this.state.isAddedMedia) { // add media to local db
            fetch(MEDIAS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: null,
                    imdb_id: this.props.media.imdbID
                })
            })
                .then(response => response.json())
                .then(jsonResponse => {
                    console.log(jsonResponse);
                    this.setState(state => ({
                        isAddedMedia: !state.isAddedMedia
                    }));
                })

        } else { // remove media from local db
            fetch(MEDIAS_URL + this.props.media.imdbID, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(response => response.json())
                .then(jsonResponse => {
                    console.log(jsonResponse);
                    this.setState(state => ({
                        isAddedMedia: !state.isAddedMedia
                    }));
                })
        }

    }

    handleShowDetails() {

        if (this.state.showDetails) { // hide details
            this.setState(state => ({
                showDetails: !state.showDetails
            }));
        } else { // fetch and show details
            fetch(OMDB_URL + this.props.media.imdbID, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })  .then(response => response.json())
                .then(jsonResponse => {
                    console.log(jsonResponse);
                    this.setState(state => ({
                        showDetails: !state.showDetails,
                        mediaInfos: jsonResponse
                    }));
                });
        }
    }


    render ()
        {
        const media = this.props.media;
        const poster = media.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : media.Poster;
        const { mediaInfos } = this.state;
        let mediaDetails;
        if(!this.state.showDetails){
            mediaDetails = null
        } else if (!mediaInfos) {
            mediaDetails = <p>mediaInfos is undefined. There might be an error</p>
        } else {
            mediaDetails = <div>
                <p>Genre: {mediaInfos.Genre}</p>
                <p>Country: {mediaInfos.Country}</p>
                <p>Language: {mediaInfos.Language}</p>
                <p>Actors: {mediaInfos.Actors}</p>
                <p>Plot: {mediaInfos.Plot}</p>
            </div>
        }

        return (<div className="media">

            <div>
                <img
                    className="media_poster"
                    width="150"
                    alt={`The media titled: ${media.Title}`}
                    src={poster}
                />

            </div>
            <div className="media_infos">
                <h2>{media.Title}</h2>
                <p>({media.Year})</p>
                {mediaDetails}
                
                <ButtonToolbar>
                    <Button variant="primary" as="input" type="button" value={this.state.showDetails ? 'less details' : 'more details'} onClick={this.handleShowDetails}/>
                    <Button  variant="primary" as="input" type="button" value={this.state.isAddedMedia ? 'media added' : 'add media'} onClick={this.handleAddMedia}/>
                </ButtonToolbar>
            </div>
        </div>)
    }
}

export default Media;