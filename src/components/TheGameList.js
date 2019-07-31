import React, {useState,useEffect}  from 'react';
import Game from './Game'
import GameForm from './GameForm'
//import gameData from '../assets/sampleGameList'
import firebase from 'firebase'

export default props => {
  let [games, setGames] = useState([])

  let initializeFirebase = () => {
    var config = {
      databaseURL: "https://mediatracker-817cd.firebaseio.com",
      projectId: "mediatracker-817cd",
    };
  
    firebase.initializeApp(config);
  }

  let addFireBaseData = async(game) => {
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

  let addGame = (newGame) => {
    addFireBaseData(newGame)
    //this.setState({ games: [...this.state.games, newGame] })
  }

  let provideFirebaseDataToState = () => {
    firebase.database().ref('games').on('value', snapshot => {
      setGames(snapshot.val())
    })
    
  }

  useEffect(() => {
    async function fetchData() {
      await initializeFirebase()
      await provideFirebaseDataToState()  
    }
    fetchData()
  }, [])

  let totalPlaytime = () => {
    let playTime = 0

    for (let game in games) {
      playTime += games[game].playTime
    }

    let hours = Math.floor(playTime / 60)
    let minutes = playTime % 60

    return `${hours}h ${minutes}min`    
  }

  let prepareGameList = () => {
    let gamesList = []
    for (let game in games) {
      gamesList.push(
        <div key={game} className="col-sm-4">
          <Game game={games[game]}></Game>
        </div>        
      )
    }
    console.log(games);
    return gamesList
    
  }

  return (
    <div className="gameslist">
      <GameForm addGame={addGame}></GameForm>
      <div className="row">
        {prepareGameList()}
      </div>
      <div>
        Total Playtime: {totalPlaytime()}
      </div>
    </div>
  )
  

}