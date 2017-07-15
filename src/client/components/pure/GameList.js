import React, { Component } from 'react';
import Game from './Game';

class GameList extends Component {

  handleClick = () => {
    this.props.gameClicked(this.props.id);
    console.log(this.props.id);
  }

	render() {

		// if (this.props.list == []) {
		// 	return <div className="game-list">Search for games to add to your list!</div>;
		// }
		console.log(this.props.list);
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
						gameClicked={this.props.deleteGame}
						buttonText='Remove'
					/>
				))}
			</div>
		);
	}
}





export default GameList;


