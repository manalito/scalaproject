import React,{Component} from 'react'

const STATISTIC_URL = "/api/users/statistics";


class Statistics extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        statistic: {
            duration: 0
        },
    };

    componentDidMount() {
        fetch(`${STATISTIC_URL}/100`)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    statistic: jsonResponse
                })
            })
    }

    render() {
        return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-blue bg-blue">
        <a className="navbar-brand" href="/"> Statistique pour Temps {this.state.statistic.duration} </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">

    </div>
    </div>
    </nav>
    )
}
}

export default Statistics;