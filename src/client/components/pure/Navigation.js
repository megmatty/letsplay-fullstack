import React, { Component } from 'react';
import { Link } from "react-router";

var navStyle = {
	backgroundColor: "#EEE",
	padding: "10px"
}

var buttonStyle = {
	backgroundColor: "yellow"
}

class Navigation extends Component {

	_logout = (event) => {
		event.preventDefault();
		this.props.manualLogout();
	}

	render() {
		return(
			<div style={navStyle}>				
				{
					this.props.user.authenticated 
					? <button onClick={this._logout} style={buttonStyle}>Logout [{this.props.user.email}]</button>
					: <Link to="/login">Log In</Link>
				}				
				{
					!this.props.user.authenticated 
					? <span>&nbsp;|&nbsp;<Link to="/register">Register</Link></span>
					: ""
				}				
				&nbsp;|&nbsp;
				<Link to="/myprofile">My Profile</Link>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<Link to="/mylist">My List</Link>
			</div>
		)	
	}
}

export default Navigation;