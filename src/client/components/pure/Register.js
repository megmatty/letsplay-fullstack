import React, { Component } from 'react';
import ReactDOM from "react-dom";

// ----------------------------------------------------
const registerMessageStyle = {
	color: "red"
}

// ----------------------------------------------------
class Register extends Component {

	constructor() {
		super();

		this.state = {
			registerMessage: ""
		}
	}

	_onRegisterSubmit = (event) => {
		event.preventDefault();
		const email = ReactDOM.findDOMNode(this.refs.email).value;
		const password = ReactDOM.findDOMNode(this.refs.password).value;
		const name = ReactDOM.findDOMNode(this.refs.name).value;
		const aboutme = ReactDOM.findDOMNode(this.refs.aboutme).value;
		const avatar = "http://www.radfaces.com/images/avatars/lawrence-cohen.jpg";
		// Passed in via react-redux. Returns a promise.
		this.props.manualRegister({
			email,
			name,
			password,
			avatar,
			aboutme
		})
		.then((registerMessage) => {
			if (registerMessage) {
				// report to the user is there was a problem during registration
				this.setState({
					registerMessage
				})			
			}	
		})		

	}

	render() {
		return(
			<div>
				<h2>Register</h2>	
				<form onSubmit={this._onRegisterSubmit}>		
					<input type="email" ref="email" placeholder="Email"/><br/>
					<input type="name" ref="name" placeholder="Name"/><br/>
					<input type="password" ref="password" placeholder="Password"/><br/>		
					<label htmlFor="aboutme">About Me</label><br/>
					<textarea id="aboutme" ref="aboutme"></textarea><br/>			
					<input type="submit" value="Register" /> <span style={registerMessageStyle}>{ this.state.registerMessage }</span>
				</form>	
			</div>
		)	
	}
}

export default Register;
