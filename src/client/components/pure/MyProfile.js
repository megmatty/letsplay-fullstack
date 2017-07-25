import React, { Component } from 'react';
import User from './User';
import FriendList from './FriendList';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchFriendsWithRedux } from '../../actions/users';

class MyProfile extends Component {
	
  // componentDidMount() {
  //  this.props.fetchFriendsWithRedux();
  // }

  render() {
		return(
			<div className="profile-container">      
        <User 
          user={this.props.player.name}
          aboutme={this.props.player.aboutme}
          avatar={this.props.player.avatar}
        />
        <FriendList 
        	friends={this.props.player.friends}
        />
      </div>
		);
	}
}

//Take state and map to prop object
const mapStateToProps = (state) => {
  return {
    ...state.user
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchFriendsWithRedux: () => dispatch(fetchFriendsWithRedux())
//   }
// }

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps)(MyProfile);