import React, {Component} from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            password2: "",
            error: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && 
        this.state.password.length > 0 &&
        this.state.password2.length > 0 &&
        this.state.password === this.state.password2
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
        }).then(response =>
            this.setState({
                error: !(response.status === 200)
            })
    )
    }

    render() {

        let error_text = null

        if (this.state.error) {
            error_text = <p className="error">Wrong password or invalid user</p>
        }

        return (
            <div className="container">
            <div className="Register">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="password2" bsSize="large">
                        <FormLabel>Re-enter Password</FormLabel>
                        <FormControl
                            value={this.state.password2}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    {error_text}
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Register
                    </Button>
                </form>
            </div>
            </div>
        );
    };
}
export default Register;