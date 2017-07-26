import React, { Component } from 'react';
import Friend from './Friend';

//Friend List 
class FriendList extends Component {

  render() {
    return (
      <div className="friendLists-container box-shadow">
        <h3>Your Friend Matches</h3>
        <div className="friend-list">
          {this.props.friends.map((friend,i) => 
            <Friend 
              key={i}
              id={friend.friendId}
              name={friend.name}
              avatar={friend.avatar}
               email={friend.email}
              games={friend.games}
            />
          )}
        </div>
      </div>
    );
  }
}

export default FriendList;



