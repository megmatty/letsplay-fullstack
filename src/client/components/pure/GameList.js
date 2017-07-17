import React, { Component } from 'react';
import Game from './Game';
import axios from 'axios';
import { loadGames } from '../../actions/games';

class GameList extends Component {

  deleteGame = (game, player) => {
    console.log(this.props.player.list);
    const id = player._id;
    axios.put(`/user/${id}`, game) 
    //insert database
      .then(res => { console.log(res); }) 
      .catch(err => { console.error(err); });
  } //need to trigger rerender when game is added..componentwillreceiveprops?

	render() {

		// if (this.props.list == []) {
		// 	return <div className="game-list">Search for games to add to your list!</div>;
		// }
		// console.log(this.props.list);
		return (
			<div className="game-list">
				{this.props.list.map((game) => (
					<Game
						key={game._id}
						id={game.id}
						name={game.name}
						cover={game.cover}
						year={game.first_release_date}
						rating={game.rating ? Math.floor(game.rating) + '/100' : 'NR'}
						summary={game.summary ? game.summary : game.storyline || 'This game has no summary'}
						gameClicked={() => {this.deleteGame(game, this.props.player)}}
						buttonText='Remove'
					/>
				))}
			</div>
		);
	}
}





export default GameList;


