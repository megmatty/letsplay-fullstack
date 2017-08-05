import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";

//Contact Friends Form View
class Contact extends Component {

  submitForm = (event) => {
    event.preventDefault();
    const message = ReactDOM.findDOMNode(this.refs.message).value;
    const email = {
      "to": this.props.email,
      "name": this.props.name,
      "game": this.props.games.join(' '),
      "message": message
    }

    axios.post('/contact', email)
     .then(res => { console.log('success', res); }) 
      .catch(err => { console.error(err); });

    this.props.close();

    $('.sent-modal').addClass('sent-modal-active');
    setTimeout(function(){ 
      $('.sent-modal').removeClass('sent-modal-active');
    }, 2500);
  }

  render() {
    return (
      <div className="contact-container email">
        <form className="contact-form" onSubmit={this.submitForm}>
          <div className="text-area">
            <label htmlFor="message">Message:</label>
            <textarea ref="message" className="box-shadow rounded-border" id="message" defaultValue={
                this.props.games.length <= 2 ? `Hey there, I would like to play ${this.props.games.join(' or ')} with you.` : `Hey there, we have a lot of games in common, and I would like to play with you.`
              }>
            </textarea>
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