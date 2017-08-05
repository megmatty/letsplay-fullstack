import React, { Component } from 'react';
import GameList from '../pure/GameList';
import Search from './Search';
import axios from 'axios';

//Redux 
import { connect } from 'react-redux';

//Actions
import { deleteGame} from '../../actions/games';


//My Lists View - Redux Parent Container
class MyList extends Component {

  componentDidMount() {
    $('.mylist-menu').addClass('active');
  }

  componentWillUnmount() {
    $('.mylist-menu').removeClass('active');
  }

  render() {
    return (
      <div className="content-container">
      	<Search />
	      <GameList
	      	list={this.props.player.list}
          player={this.props.player}
          deleteGame={this.props.deleteGame}
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

// Dispatch the gamesGetData action creator with a prop
const mapDispatchToProps = (dispatch) => {
	return {
		deleteGame: (id) =>  dispatch(deleteGame(id))
	};
};

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
