import React, { Component } from 'react';
import { Link } from 'react-router';

class Friend extends Component {
  

  render() {
    return (
      <div className="friend">
        <img className="avatar" src={this.props.avatar} alt="avatar"/>
        <p>{this.props.id}</p>
        <p>{this.props.name} plays:</p>
	<p>{this.props.email}</p>
	{ console.log(this) }
        <div className="common-games-list">
          {//this.props.games.map((game,i) => 
            //<p key={i}>{game}</p>
	    <p>hi</p>
          //)
	  }
        </div>
        <Link to="/contact"><img src="envelope.png" alt="contact icon"/></Link>
      </div>
    );
  }
}

export default Friend;
