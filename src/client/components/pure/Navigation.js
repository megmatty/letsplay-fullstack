import React, { Component } from 'react';
import { Link } from "react-router";

// var navStyle = {
// 	backgroundColor: "#EEE",
// 	padding: "10px"
// }

// var buttonStyle = {
// 	backgroundColor: "yellow",
// 	width: "30%"
// }

class Navigation extends Component {

	_logout = (event) => {
		event.preventDefault();
		this.props.manualLogout();
	}

	render() {
		return(
			<div className="nav">				
				<Link to="/" className="brand">Let's Play</Link>
				<div className="nav-group">
					<Link to="/myprofile">My Profile</Link>
					<Link to="/mylist">My List</Link>
				</div>
				<div className="auth-group">
					{
						this.props.user.authenticated 
						? <button onClick={this._logout}>Logout [{this.props.user.email}]</button>
						: <Link to="/login">Log In</Link>
					}				
					{
						!this.props.user.authenticated 
						? <span> | <Link to="/register">Register</Link></span>
						: ""
					}
				</div>
			</div>
		)	
	}
}

export default Navigation;