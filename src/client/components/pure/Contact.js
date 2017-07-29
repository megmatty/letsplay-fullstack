import React, { Component } from 'react';

//Contact Friends Form View
class Contact extends Component {
  render() {
    return (
      <div className="contact-container">
        <h3>Contact Friend</h3>
        <form className="contact-form">
          <label htmlFor="to">To:</label>
          <input type="text" id="to" />
          <br />
          <label htmlFor="game">Game:</label>
          <input type="text" id="game" />
          <br />
          <label htmlFor="message">Message:</label>
          <textarea className="box-shadow rounded-border" id="message" defaultValue="Hey there, I would like to play with you.">
          </textarea>
          <br />
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