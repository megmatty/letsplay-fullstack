import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";

//Contact Friends Form View
class Contact extends Component {

  submitForm = (event) => {
    event.preventDefault();
    const to = ReactDOM.findDOMNode(this.refs.to).value;
    const game = ReactDOM.findDOMNode(this.refs.game).value;
    const message = ReactDOM.findDOMNode(this.refs.message).value;
    const email = {
      "to": to,
      "game": game,
      "message": message
    }

    axios.post('/contact', email)
     .then(res => { console.log('success', res); }) 
      .catch(err => { console.error(err); });
  }

  render() {
    return (
      <div className="contact-container">
        <h3>Contact Friend</h3>
        <form className="contact-form" onSubmit={this.submitForm}>
          <div className="form-item">
            <label htmlFor="to">To:</label>
            <input ref="to" type="text" id="to" />
          </div>
          <div className="form-item">
            <label htmlFor="game">Game:</label>
            <input ref="game" type="text" id="game" />
          </div>
          <div className="text-area">
            <label htmlFor="message">Message:</label>
            <textarea ref="message" className="box-shadow rounded-border" id="message" defaultValue="Hey there, I would like to play with you."></textarea>
            </div>
          <div className="captcha">
            <input type="checkbox" required id="captcha"/>
            <label htmlFor="captcha">I am not a robot</label>
          </div>
          <input className="reg-button box-shadow" type="submit" value="Send" />       
        </form>
      </div>
    );
  }
}

export default Contact;