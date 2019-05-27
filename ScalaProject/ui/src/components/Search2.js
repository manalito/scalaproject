import React from "react";

const Search2 = React.createClass({
    render: function() {
        return (
            <form onSubmit={this.props.onSubmit} id="search" className="Search">
                <input type="search" placeholder="Search for a title..." />
            </form>
        );
    }
});

export default Search2;