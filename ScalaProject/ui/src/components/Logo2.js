import React from "react";

import logo from "../images/walidDB.png"

const Logo2 = () => ({
    render: function() {
        return (
            <div id="logo" className="Logo">
            <img src= {logo} alt="logo"/>
            </div>


    );
    }
});

export default Logo2;