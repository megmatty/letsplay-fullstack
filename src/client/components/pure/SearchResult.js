import React, { Component } from 'react';

class SearchResult extends Component {

  selectResult = () => {
    this.props.selectResult(this.props.name);
  }
  // //bind the function to *this*


  render() {
    return (
      <div className="game">
        <p onClick={this.selectResult}>{this.props.name}</p>
      </div>
    );
  }
}

export default SearchResult;