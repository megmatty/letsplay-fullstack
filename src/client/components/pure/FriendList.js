import React, { Component } from 'react';
import Friend from './Friend';
import axios from 'axios';

//Friend List - redux state container
class FriendList extends Component {

 //  componentDidMount() {
 //   axios.get('/myprofile')
 //   .then(res => {
 //    console.log(res);
 //    // this.props.friends = res.data.users;
 //   // this.setState({ data: res.data });
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



