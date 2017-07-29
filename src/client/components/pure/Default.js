import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

class Default extends Component {
	
  // componentDidMount() {
  //   axios.post('/')
  //    .then(res => {
  //      console.log(res);
  //     } 
  //   )
  // }


  render() {
		return (
        <div className="container">
          <div className="hero">
          </div>
          <div className="feature">
            <FontAwesome
              className="landing-icon"
              name="search"
              size="lg"
            />  
            <span className="feature-title">Search</span>
            <p>Search for your favorite (or soon to be favorite!) video games powered by <a href="http://www.igdb.com">IGDB.com</a>, the Internet Gaming Database, which currently offers more than 50,000 games from which to choose.</p>
          </div>
          <div className="feature">
            <FontAwesome
                className="landing-icon"
                name="plus-square-o"
                size="lg"
              />  
            <span className="feature-title">Add Games</span>
            <p>After registering and creating your profile, start adding the games you’re interested in playing with others to your own personal list. Read descriptions, view box art, see ratings, and more!</p>
          </div>
          <div className="feature">
            <FontAwesome
                className="landing-icon"
                name="refresh"
                size="lg"
              />  
            <span className="feature-title">Get Matched</span>
            <p>Visit your profile after adding some games to see other users that are looking for friends to play that game with too! Click on the message icon to shoot your new friend an email and make a play date!</p>
          </div>
          <footer><span>Meg Matty &copy; 2017</span></footer>
        </div>
    );	
	}
}

export default Default;