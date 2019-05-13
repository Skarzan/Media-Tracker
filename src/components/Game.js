import React, { Component } from 'react';

export default class Game extends Component {

  displayPlaytime() {
    let time = new Date(this.props.game.playTime)
    let hours = time.getHours() - 1
    let minutes = time.getMinutes()

    return `${hours}h ${minutes}min`
  }

  displayDate(attribute) {
    let date = new Date(this.props.game[attribute])
    date = date.toLocaleDateString()
    return date
  }

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
            <div>Playtime: { this.displayPlaytime() }</div>  
            <div>{this.displayDate('startDate')} - {this.displayDate('endDate')}</div>
            <div className="card-text">
              {this.props.game.comment}
            </div>        
          </div>
        </div>

      </div>
    )
  }
}
