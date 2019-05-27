import React, { useState } from "react";

// As the name implies, useState lets us add React state to our function components.
const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }
    const resetInputField = () => {
        setSearchValue("")
    }
    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }
    return (
        <form id="search" className="Search">
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="search"
                placeholder="Search for a title..."
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>

        /*<form onSubmit={this.props.callSearchFunction} id="search" className="Search">
        <input type="search" placeholder="Search for a title..." />
        </form>*/
    );
}



export default Search;