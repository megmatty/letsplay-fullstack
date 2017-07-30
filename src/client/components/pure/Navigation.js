import React, { Component } from 'react';
import { Link } from "react-router";

class Navigation extends Component {

	_logout = (event) => {
		event.preventDefault();
		this.props.manualLogout();
	}

	render() {

		return(
			<div className="nav box-shadow">				
				<Link to="/" className="brand">Let's Play</Link>
					{this.props.user.authenticated
						? <div className="nav-group">
								<Link to="/myprofile">My Profile</Link>
								<span> | </span>
								<Link to="/mylist">My List</Link>
							</div>
						: <div></div>
					}
				<div className="auth-group">
					{
						this.props.user.authenticated 
						? <button className="log-button box-shadow" onClick={this._logout}>Logout</button>
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