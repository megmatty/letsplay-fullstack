import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router';

class Game extends Component {
  //bind the function to *this*
  constructor() {
    super();
    this.state = {
      active: false
    };
  }

  handleClick = () => {
    this.props.gameClicked(this.props.id);
    console.log(this.props.id);
  }

  activeGame = () => {
    const currentState = this.state.active;
    this.setState({active: !currentState});
  }

  render() {
    let result = null;
    if (this.state.active === false) {
      result =  <div className="game-wrapper box-shadow rounded-border" onClick={this.activeGame}>
                  { this.props.cover ? 
                    <img className="box-art rounded-border" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${this.props.cover.cloudinary_id}.jpg`} alt='gamebox art' />
                    :
                    <div>No Image Provided</div>
                  }
                    <div className="game-name-wrapper">
                      <p className="game-name">{this.props.name}</p>
                      <p className="game-toggle">{'\u2795'}</p>
                    </div>
                </div>;
    } else {
        result =  <div className="game-expanded box-shadow rounded-border" onClick={this.activeGame}>
                    <p className="game-name">{this.props.name}<span className="game-toggle">{'\u2796'}</span></p>
                    { this.props.cover ? 
                      <img className="box-art-big" src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${this.props.cover.cloudinary_id}.jpg`} alt='gamebox art' />
                      :
                      <div>No Image Provided</div>
                    }
                    <p>Year: <Moment format="YYYY">{this.props.first_release_date}</Moment></p>
                    <p>Rating: {this.props.rating}</p>
                    <p className='summary'>{this.props.summary ? this.props.summary : this.props.storyline || 'This game has no summary'}</p>
                    <button className="add-delete-button rounded-border" onClick={this.handleClick}>{this.props.buttonText}</button>
                  </div>;
    }

    return (
      <div className="results-wrapper">
        {result}
      </div>
    );
  }
}

export default Game;