import React, { Component } from 'react';
import User from './User';
import FriendList from './FriendList';
import { connect } from 'react-redux';
import { deleteFriend, matchFriends } from '../../actions/games';

class MyProfile extends Component {
	
  // componentDidMount() {
  //   dispatch(matchFriends());
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
    ...state.user,
    ...state.friends
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFriend: (id) => dispatch(deleteFriend(id))
  }
}

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);