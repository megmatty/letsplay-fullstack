import React, { Component } from 'react';
import Friend from './Friend';
import axios from 'axios';

//Friend List - redux state container
class FriendList extends Component {

  componentDidMount() {
   axios.get('/myprofile')
   .then(res => {
    console.log(res);
    // this.props.friends = res.data.users;
   // this.setState({ data: res.data });
   });

 }


  render() {
    return (
      <div className="friendLists-container">
        <h3>My Game Friends</h3>
        <div className="friend-list">
          {this.props.friends.map((friend,i) => 
            <Friend 
              key={i}
              id={friend.id}
              name={friend.name}
              avatar={friend.avatar}
              deleteFriend={this.props.deleteFriend}
        />
          )}
        </div>
      </div>
    );
  }
}

export default FriendList;



