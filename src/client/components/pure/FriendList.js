import React, { Component } from 'react';
import Friend from './Friend';
import axios from 'axios';
import { fetchFriends } from '../../actions/users';

//Friend List - redux state container
class FriendList extends Component {

 //  componentDidMount() {
 
 //   });

 // }


  render() {
    return (
      <div className="friendLists-container">
        <h3>Top Friend Matches</h3>
        <div className="friend-list">
          {this.props.friends.map((friend,i) => 
            <Friend 
              key={i}
              id={friend.friendId}
              // name={friend.name}
              // avatar={friend.avatar}
               email={friend.email}
              // games={friend.games}
        />
          )}
        </div>
      </div>
    );
  }
}

export default FriendList;



