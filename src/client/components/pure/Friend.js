import React, { Component } from 'react';
import { Link } from 'react-router';

class Friend extends Component {
  
  handleDelete = () => {
    this.props.deleteFriend(this.props.id);
  }
  //bind the function to *this* so it doesn't delete them all on render

  render() {
    return (
      <div className="friend">
        <img className="avatar" src={this.props.avatar} alt="avatar"/>
        <p>{this.props.name}</p>
        <button onClick={this.handleDelete}>Delete</button>
        <Link to="/contact"><img src="envelope.png" alt="contact icon"/></Link>
      </div>
    );
  }
}

export default Friend;