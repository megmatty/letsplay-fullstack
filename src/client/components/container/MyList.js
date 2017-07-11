import React, { Component } from 'react';
import GameList from '../pure/GameList';
import Search from './Search';

//Redux 
import { connect } from 'react-redux';

//Actions
import { deleteGame } from '../../actions/games';


//My Lists View - Redux Parent Container
class MyList extends Component {

  render() {
    return (
      <div className="content-container">
      	<Search />
       	<h3>My List</h3>
	      <GameList
	      	gamesList={this.props.gamesList}
	      	deleteGame={this.props.deleteGame}
	      />
      </div>
    );
  }
}

//Take state and map to prop object
const mapStateToProps = (state) => {
  console.log(state);
  console.log(this);
  return {
    ...state.gamesList,
    ...state.user
  };
};

// Dispatch the gamesGetData action creator with a prop
const mapDispatchToProps = (dispatch) => {
	return {
		deleteGame: (id) => {
			console.log('delete game', id);
			dispatch(deleteGame(id));
		}
	};
};

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
