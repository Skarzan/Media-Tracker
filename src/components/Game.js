import React, { Component } from 'react';

export default class Game extends Component {
  render() {

    /*set color for game respective for the completion status
    not beaten = blue
    beaten = green
    completed = gold */
    let beatenClass = 'bg-primary'
    if (this.props.game.beaten) beatenClass = 'bg-success'
    if (this.props.game.completed) beatenClass = 'bg-warning' 

    return (
      <div className="game">
        
        <div className="card">
          <div className={'card-header text-white ' + beatenClass}>
            { this.props.game.title }
          </div>
          <div className="card-body">
            <div>Playtime: { this.props.game.playTime }</div>          
          </div>
        </div>

      </div>
    )
  }
}
