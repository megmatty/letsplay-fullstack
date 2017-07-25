import React, { Component } from 'react';
import { Link } from 'react-router';

class Friend extends Component {
  

  render() {
    return (
      <div className="friend">
        <img className="avatar" src={this.props.avatar} alt="avatar"/>
        <p>{this.props.name} plays:</p>
        <div className="common-games-list">
          {this.props.games.map((game,i) => 
            <p key={i}>{game}</p>
            )
      	  }
        </div>
        <Link to="/contact"><img src="envelope.png" alt="contact icon"/></Link>
      </div>
    );
  }
}

export default Friend;
