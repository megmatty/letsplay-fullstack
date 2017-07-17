import React, { Component } from 'react';
import GameList from '../pure/GameList';
import Search from './Search';
import axios from 'axios';

//Redux 
import { connect } from 'react-redux';

//Actions
import { deleteGame, loadGames } from '../../actions/games';


//My Lists View - Redux Parent Container
class MyList extends Component {

  // componentDidMount() {
  //   console.log(this.props.gamesList);
  //   loadGames();
  // }


  render() {
    return (
      <div className="content-container">
      	<Search />
       	<h3>My List</h3>
	      <GameList
	      	list={this.props.gamesList}
          player={this.props.player}
	      />
      </div>
    );
  }
}

//Take state and map to prop object
const mapStateToProps = (state) => {
  return {
    gamesList: state.user.player.list,
    ...state.user,
    ...state.player
  };
};

// Dispatch the gamesGetData action creator with a prop
const mapDispatchToProps = (dispatch) => {
	return {
		deleteGame: (id) => {dispatch(deleteGame(id))}
    // loadGames: () => {dispatch(loadGames())}
	};
};

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
