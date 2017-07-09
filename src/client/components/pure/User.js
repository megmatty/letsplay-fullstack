import React, { Component } from 'react';

//User Profile Info
class User extends Component {
  render() {
    return (
      <div className="user-container">
        <img className="avatar" src="http://www.radfaces.com/images/avatars/jane-lane.jpg" alt="avatar"/>
        <h2>{this.props.user}</h2>
        <h4>About Me</h4>
        <p> Gluten-free ethical wolf tote bag umami. 3 wolf moon organic man braid hexagon, next level chicharrones small batch prism tacos banjo blue bottle bushwick.</p>
      </div>
    );
  }
}

export default User;