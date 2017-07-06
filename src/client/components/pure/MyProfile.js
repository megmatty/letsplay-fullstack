import React, { Component } from 'react';
import Search from '../../components/container/Search';

class MyProfile extends Component {
	render() {
		return(
			<div>
				<Search />
				<h2>My Profile</h2>
				<p>You're seeing this page because you logged in successfully! Try logging out, clicking the MyProfile link and then completing the login. You wil notice that it redirects you to MyProfile page :)</p>
			</div>
		)
	}
}

export default MyProfile;