import React, { Component } from 'react';
import Game from './Game';
import axios from 'axios';

class GameList extends Component {

  removeGame = (game, player) => {
    const id = player._id;
    const gameId = game.id;
    this.props.deleteGame(gameId);
    axios.put(`/user/${id}`, game) 
    //insert database
      .then(res => { console.log('success', res); }) 
      .catch(err => { console.error(err); });
  } 

	render() {

		if (this.props.list.length === 0) {
			return <div className="game-list box-shadow rounded-border">Search for games to add to your list!</div>;
		}

		return (
			<div className="game-list box-shadow rounded-border">
			  <h3>My List</h3>
				{this.props.list.map((game) => (
					<Game
						key={game.id}
						id={game.id}
						name={game.name}
						cover={game.cover}
						year={game.first_release_date}
						rating={game.rating ? Math.floor(game.rating) + '/100' : 'NR'}
						summary={game.summary ? game.summary : game.storyline || 'This game has no summary'}
						gameClicked={() => {this.removeGame(game, this.props.player)}}
						buttonText='Remove'
					/>
				))}
			</div>
		);
	}
}





export default GameList;


