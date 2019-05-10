import React, { Component } from 'react';
import Game from './Game'
import gameData from '../assets/sampleGameList'

export default class GamesList extends Component {
  
  state = {
    games: []
  }

  async componentDidMount() {
    await this.setState({games: gameData})
  }

  render() {
    let games = this.state.games.map(game => {
      return (
        <div className="col-sm-4">
          <Game game={game}></Game>
        </div>
      )
    })


    return (
      <div className="gameslist">
        { this.props.children }
        <div className="row">
          {games}
        </div>
        
      </div>
    )
  }
}

