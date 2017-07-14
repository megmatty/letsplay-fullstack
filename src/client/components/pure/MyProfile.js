import React, { Component } from 'react';
import User from './User';
import FriendList from './FriendList';
import { connect } from 'react-redux';
import { deleteFriend } from '../../actions/games';

class MyProfile extends Component {
	render() {
		return(
			<div className="profile-container">      
        <User user="janedoe"/>
        <FriendList 
        	friends={this.props.friends} 
        	deleteFriend={this.props.deleteFriend}
        />
      </div>
		);
	}
}

//Take state and map to prop object
const mapStateToProps = (state) => {
  return {
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