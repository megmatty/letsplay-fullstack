import React, { Component } from 'react';
import User from './User';
import FriendList from './FriendList';
import { connect } from 'react-redux';
import { fetchFriends } from '../../actions/users';
import axios from 'axios';
class MyProfile extends Component {
	
  componentDidMount() {
       console.log('myprofile GET');
    axios.put('/myprofile')
     .then(res => {
      console.log(res);
      // this.props.friends = res.data.users;
     // this.setState({ data: res.data });
     this.props.fetchFriends(res.data);
  } )}

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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFriends: (data) => dispatch(fetchFriends(data))
  }
}

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);