import React, { Component } from 'react';
import { Link } from 'react-router';

class Friend extends Component {
  

  render() {
    return (
      <div className="friend box-shadow rounded-border">
        <img className="avatar box-shadow" src={this.props.avatar} alt="avatar"/>
        <p>{this.props.name} plays:</p>
        <div className="common-games-list">
          {this.props.games.map((game,i) => 
            <p key={i}>{game}</p>
          )
	       }
        </div>
        <Link to="/contact"><img className="avatar box-shadow" src="/img/email.png" alt="contact icon"/></Link>
      </div>
    );
  }
}

export default Friend;
