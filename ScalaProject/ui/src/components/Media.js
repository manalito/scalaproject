import React from "react";
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
const DEFAULT_PLACEHOLDER_IMAGE =
    "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


// Here it is just a presentational component (it doesn’t have any internal state)
// that renders the media title, image, and year.
const Media = ({ media }) => {
    const poster =
        media.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : media.Poster;
    return (
        <div className="media">
            
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
                <p></p>
                <ButtonToolbar>
                    <Button variant="primary" as="input" type="button" value="more details" />
                    <Button variant="primary" as="input" type="button" value="click me" />
                </ButtonToolbar>
            </div>
        </div>
    );
};
export default Media;