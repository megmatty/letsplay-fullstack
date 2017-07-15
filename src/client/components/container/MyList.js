import React, { Component } from 'react';
import GameList from '../pure/GameList';
import Search from './Search';

//Redux 
import { connect } from 'react-redux';

//Actions
// import { deleteGame } from '../../actions/games';


//My Lists View - Redux Parent Container
class MyList extends Component {

  deleteGame = (game, player) => {
    // const id = player._id;
    // axios.delete(`/user/${id}`, game) 
    // //insert database
    //   .then(res => { console.log(res); }) 
    //   .catch(err => { console.error(err); });
  } //need to trigger rerender when game is added


  render() {
    return (
      <div className="content-container">
      	<Search />
       	<h3>My List</h3>
	      <GameList
	      	list={this.props.player.list}
	      	deleteGame={() => {this.deleteGame(game, this.props.player)}}
	      />
      </div>
    );
  }
}

//Take state and map to prop object
const mapStateToProps = (state) => {
  return {
    ...state.user,
    ...state.player
  };
};

// Dispatch the gamesGetData action creator with a prop
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		deleteGame: (id) => {dispatch(deleteGame(id))}
// 	};
// };

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps)(MyList);
