import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gamesGetData, captureQuery, resetGames, addGame } from '../../actions/games';
import Game from '../../components/pure/Game';
import axios from 'axios';
import API_KEY from '../../../../config';

class Search extends Component {

	getQuery = () => {
		let input = this.refs.input;
    this.props.captureQuery(input.value);
    this.setState({query: input.value});
  }

  addGame = (game, player) => {
  	const id = player._id;
  	this.props.addGame(game);
  	axios.post(`/user/${id}`, game) 
  	//insert database
  		.then(res => { console.log(res); }) 
  		.catch(err => { console.error(err, 'kiwi'); });
  	this.props.resetGames(); //resets search results array to empty
  	this.refs.input.value = ''; //resets input to empty
  } 

	loadResults = () => {
		let query = this.refs.input.value;
		//new API requires proxy to get around CORS
		const proxyurl = "https://cors-anywhere.herokuapp.com/";
		const igdburl = "https://api-2445582011268.apicast.io";
		const request = new Request(`${proxyurl + igdburl}/games/?fields=name%2Crating%2Cfirst_release_date%2Csummary%2Cstoryline%2Ccover&limit=10&offset=0&search=${query}`, {
	      headers: new Headers({
	        'user-key': API_KEY,
	        'Accept': 'application/json'
	      })
	  });
		this.props.getGameData(request);
	}

	componentWillUnmount() {
		this.props.resetGames(); 
  	this.refs.input.value = ''; 
	}
 
	render() {

		if (this.props.hasErrored === true) {
			return 	<div className="searchbar">
								<input ref="input" type="search" placeholder="Search for games" value={this.props.query} onChange={this.getQuery} />
								<button type="submit" onClick={this.loadResults}>Go</button>
								<div className="results-error">Sorry! There was an error loading the list items.</div>
							</div>;
		}

		if (this.props.isLoading === true) {
			return 	<div className="searchbar">
								<input ref="input" type="search" placeholder="Search for games" value={this.props.query} onChange={this.getQuery} />
								<button type="submit" onClick={this.loadResults}>Go</button><div className="results-loading">Loading...</div>
							</div>;
		}

		return (
			<div className="searchbar">
				<input ref="input" type="search" placeholder="Search for games" value={this.props.query} onChange={this.getQuery} />
				<button type="submit" className="box-shadow go-button" onClick={this.loadResults}>Go</button>
				<div className="results box-shadow rounded-border">
					{this.props.games.map((game) => (
          	<Game
          		key={game.id}
							id={game.id}
							name={game.name}
							cover={game.cover}
							year={game.first_release_date}
							rating={game.rating ? Math.floor(game.rating) + '/100' : 'NR'}
							summary={game.summary ? game.summary : game.storyline || 'This game has no summary'}
          		gameClicked={() => {this.addGame(game, this.props.player)}}
          		buttonText='Add to List'
          	/>
            ))   
          }
				</div>
			</div>
		);
	}
}

//Take state and map to prop object
const mapStateToProps = (state) => {
	// console.log(state);
	return {
		games: state.games,
		hasErrored: state.gamesHasErrored,
		isLoading: state.gamesIsLoading,
		player: state.user.player
	};
};


//Dispatch the gamesGetData action creator with a prop
const mapDispatchToProps = (dispatch) => {
	return {
		getGameData: (request) => dispatch(gamesGetData(request)),
		captureQuery: (query) => dispatch(captureQuery(query)),
		resetGames: () => dispatch(resetGames()),
		addGame: (game) => dispatch(addGame(game))
	};
};

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps, mapDispatchToProps)(Search);
