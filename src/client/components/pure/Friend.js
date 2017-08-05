import React, { Component } from 'react';
import { Link } from 'react-router';
import Contact from './Contact';


class Friend extends Component {
  constructor() {
    super();
    this.state = {
      contactOpen: false
    }
  }

  clickContact = () => {
    this.setState({
      contactOpen: !this.state.contactOpen
    });
  }

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
        <img className="avatar box-shadow" src="/img/email.png" alt="contact icon" onClick={this.clickContact}/>
        {this.state.contactOpen ? <Contact email={this.props.email} name={this.props.name} games={this.props.games}/> : null }
      </div>
    );
  }
}

export default Friend;
