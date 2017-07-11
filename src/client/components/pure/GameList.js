import React, { Component } from 'react';
import Game from './Game';

class GameList extends Component {

	render() {
		return (
			<div className="game-list">
				{this.props.gamesList.map((game) => (
					<Game
						key={game.id}
						id={game.id}
						name={game.name}
						cover={game.cover}
						year={game.first_release_date}
						rating={game.rating ? Math.floor(game.rating) + '/100' : 'NR'}
						summary={game.summary ? game.summary : game.storyline || 'This game has no summary'}
						gameClicked={this.props.deleteGame}
						buttonText='Remove'
					/>
				))}
			</div>
		);
	}
}





export default GameList;


