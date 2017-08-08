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
			registerMessage: "",
			avatarClicked: "",
			avatarClass: false
		}
	}

	_onRegisterSubmit = (event) => {
		event.preventDefault();
		const email = ReactDOM.findDOMNode(this.refs.email).value;
		const password = ReactDOM.findDOMNode(this.refs.password).value;
		const name = ReactDOM.findDOMNode(this.refs.name).value;
		const aboutme = ReactDOM.findDOMNode(this.refs.aboutme).value;
		const avatar = this.state.avatarClicked;
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

	selectedAvatar = (e) => {
		this.setState({avatarClicked: e.target.src});
		console.log(e.target.src);
		$('.selected').removeClass('selected');
		e.target.className = "selected avatar box-shadow";
	}

	render() {

		return(
			<div className="register">
				<h2>Register</h2>	
				<form onSubmit={this._onRegisterSubmit}>		
					<input type="email" ref="email" placeholder="Email"/>
					<input type="name" ref="name" placeholder="Name"/>
					<input type="password" ref="password" placeholder="Password"/>	
					<p>Choose Avatar:</p>
					<div id="avatarSelect" className="avatar-selector">
						<img id="1" className="notSelected avatar box-shadow" src="/img/avatar1.png" onClick={this.selectedAvatar}/>
						<img id="2" className="notSelected avatar box-shadow" src="/img/avatar2.png" onClick={this.selectedAvatar}/>
						<img className="notSelected avatar box-shadow" src="/img/avatar3.png" onClick={this.selectedAvatar}/>
						<img  className="notSelected avatar box-shadow" src="/img/avatar4.png" onClick={this.selectedAvatar}/>
						<img className="notSelected avatar box-shadow" src="/img/avatar5.png"onClick={this.selectedAvatar}/>
					</div>
					<br/>
					<label htmlFor="aboutme">About Me</label><br/>
					<textarea className="rounded-border" id="aboutme" ref="aboutme"></textarea><br/>			
					<input className="reg-button box-shadow" type="submit" value="Register" /> <span style={registerMessageStyle}>{ this.state.registerMessage }</span>
				</form>	
			</div>
		)	
	}
}

export default Register;
