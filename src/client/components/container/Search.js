import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gamesGetData, captureQuery } from '../../actions/games';
import SearchResult from '../../components/pure/SearchResult';
import Game from '../../components/pure/Game';
import axios from 'axios';

class Search extends Component {

	getQuery = () => {
		//the query doesn't need to be stored in state actually, we can pull it from ref input, then use it on Go to get results
		let input = this.refs.input;
    this.props.captureQuery(input.value);
    this.setState({query: input.value});
  }

  handleClick = () => {
  	this.setState({active: true});
  	console.log(this);
  	console.log('clicked');
  }

  addGame = (game) => {
  	console.log(game);
  	axios.post('zebracake.com', JSON.stringify(game)) 
  		.then(res => { console.log(res); }) 
  		.catch(err => { console.error(err); });
  }


	loadResults = () => {
		let query = this.refs.input.value;
		const request = new Request(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name%2Crating%2Cfirst_release_date%2Csummary%2Cstoryline%2Ccover&limit=10&offset=0&search=${query}`, {
	      headers: new Headers({
	        'X-Mashape-Key': 'EUQMsXMjGmmshSjK8dQ9W31H8UOtp1wKG3bjsnwgRTlndgTXjR'
	      })
	  });
		this.props.getGameData(request);
	}
 
	render() {

		if (this.props.hasErrored) {
			return <p>Sorry! There was an error loading the list items.</p>;
		}

		if (this.props.isLoading) {
			return <p>Loading...</p>;
		}

		return (
			<div className="searchbar">
				<input ref="input" type="search" placeholder="Search for games" value={this.props.query} onChange={this.getQuery} />
				<button type="submit" onClick={this.loadResults}>Go</button>
				<div className="results">
					{this.props.games.map((game) => (
          	<Game
          		active={false}
          		key={game.id}
							id={game.id}
							name={game.name}
							cover={game.cover}
							year={game.first_release_date}
							rating={game.rating ? Math.floor(game.rating) + '/100' : 'NR'}
							summary={game.summary ? game.summary : game.storyline || 'This game has no summary'}
          		gameClicked={() => {this.addGame(game)}}
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
	return {
		games: state.games,
		hasErrored: state.hasErrored,
		isLoading: state.isLoading
	};
};


//Dispatch the gamesGetData action creator with a prop
const mapDispatchToProps = (dispatch) => {
	return {
		getGameData: (request) => dispatch(gamesGetData(request)),
		selectGameResult: (name) => dispatch(selectGameResult(name)),
		captureQuery: (query) => dispatch(captureQuery(query))
	};
};

//Connect component to Redux while mapping props for us to use
export default connect(mapStateToProps, mapDispatchToProps)(Search);
