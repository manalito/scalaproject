import React from "react";


// Here it is just a presentational component (it doesn’t have any internal state)
// that renders the media title, image, and year.
const User = ({ user }) => {
    return (
        <div className="user_infos">
                <p>{user.username}</p>
        </div>
    );
};
export default User;