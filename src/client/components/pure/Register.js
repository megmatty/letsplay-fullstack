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
		const avatar = this.state.avatarClicked;
			//avatar needs an interface for selection
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
		console.log(e.target.src);
		this.setState({avatarClicked: e.target.src});
	}


	render() {
		return(
			<div>
				<h2>Register</h2>	
				<form onSubmit={this._onRegisterSubmit}>		
					<input type="email" ref="email" placeholder="Email"/><br/>
					<input type="name" ref="name" placeholder="Name"/><br/>
					<input type="password" ref="password" placeholder="Password"/><br/>		
					<div>
						<p>Choose Avatar:</p>
						<img className="avatar" src="http://www.radfaces.com/images/avatars/bobby-budnick.jpg" onClick={this.selectedAvatar}/>
						<img className="avatar" src="http://www.radfaces.com/images/avatars/eddie-gelfen.jpg" onClick={this.selectedAvatar}/>
						<img className="avatar" src="http://www.radfaces.com/images/avatars/krumm.jpg" onClick={this.selectedAvatar}/>
						<img className="avatar" src="http://www.radfaces.com/images/avatars/lori-beth-denberg.jpg" onClick={this.selectedAvatar}/>
						<img className="avatar" src="http://www.radfaces.com/images/avatars/aeon-flux.jpg"onClick={this.selectedAvatar}/>
					</div>
					<label htmlFor="aboutme">About Me</label><br/>
					<textarea id="aboutme" ref="aboutme"></textarea><br/>			
					<input type="submit" value="Register" /> <span style={registerMessageStyle}>{ this.state.registerMessage }</span>
				</form>	
			</div>
		)	
	}
}

export default Register;
