import React, { Component } from 'react';
import Game from './Game'
import GameForm from './GameForm'
//import gameData from '../assets/sampleGameList'
import firebase from 'firebase'

export default class GamesList extends Component {
  
  state = {
    games: []
  }

  initializeFirebase = () => {
    var config = {
      databaseURL: "https://mediatracker-817cd.firebaseio.com",
      projectId: "mediatracker-817cd",
    };
  
    firebase.initializeApp(config);
    console.log(firebase)
  }

  addFireBaseData = async(game) => {
    firebase.database().ref('games/').push({
      ...game
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }

  addGame = (newGame) => {
    this.addFireBaseData(newGame)
    //this.setState({ games: [...this.state.games, newGame] })
  }

  provideFirebaseDataToState = () => {
    firebase.database().ref('games').on('value', snapshot => {
      this.setState({games: snapshot.val()})
    })
  }

  async componentDidMount() {
    //await this.setState({games: gameData})
    await this.initializeFirebase()
    await this.provideFirebaseDataToState()
  }

  totalPlaytime = () => {
    let playTime = 0

    for (let game in this.state.games) {
      playTime += this.state.games[game].playTime
      console.log(playTime)
    }

    let hours = Math.floor(playTime / 60)
    let minutes = playTime % 60

    return `${hours}h ${minutes}min`    
    
  }

  render() {
    
    let games = []
    for (let game in this.state.games) {
      games.push(
        <div onClick={() => this.test(game)} key={game} className="col-sm-4">
          <Game game={this.state.games[game]}></Game>
        </div>        
      )
    }


    return (
      <div className="gameslist">
        <GameForm addGame={this.addGame}></GameForm>
        <div className="row">
          {games}
        </div>
        <div>
          Total Playtime: {this.totalPlaytime()}
        </div>
      </div>
    )
  }
}