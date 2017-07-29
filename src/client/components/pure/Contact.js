import React, { Component } from 'react';

//Contact Friends Form View
class Contact extends Component {
  render() {
    return (
      <div className="contact-container">
        <h3>Contact Friend</h3>
        <form className="contact-form">
          <div className="form-item">
            <label htmlFor="to">To:</label>
            <input type="text" id="to" />
          </div>
          <div className="form-item">
            <label htmlFor="game">Game:</label>
            <input type="text" id="game" />
          </div>
          <div className="text-area">
            <label htmlFor="message">Message:</label>
            <textarea className="box-shadow rounded-border" id="message" defaultValue="Hey there, I would like to play with you."></textarea>
            </div>
          <div className="captcha">
            <input type="checkbox" required id="captcha"/>
            <label htmlFor="captcha">I am not a robot</label>
          </div>
          <button className="send-email">Send Email</button>             
        </form>
      </div>
    );
  }
}

export default Contact;