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
            <div>
                <h2>Statistique du mois :  </h2>
                <h3> Temps de visionnage total à prévoir : {this.state.statistic.duration}  heures.</h3>
            </div>
    )
}
}

export default Statistics;