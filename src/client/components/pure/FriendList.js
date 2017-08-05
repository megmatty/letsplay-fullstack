import React, { Component } from 'react';
import Friend from './Friend';

//Friend List 
class FriendList extends Component {

  render() {
    if (this.props.friends.length === 0) {
      return <div className="empty-friend-list box-shadow rounded-border">Add games to your list to get matched to new game friends!</div>;
    }

    return (
      <div className="friendLists-container box-shadow rounded-border">
        <h3>Your Friend Matches</h3>
        <div className="sent-modal rounded-border">Mail Sent!</div>
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



