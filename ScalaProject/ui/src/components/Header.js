import React from "react";

//functional component that renders the header tag with the text props.
const Header = (props) => {
    return (
        <header className="App-header">
            <h2>{props.text}</h2>
        </header>
    );
};
export default Header;