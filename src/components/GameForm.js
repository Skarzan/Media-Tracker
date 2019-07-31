import React, { Component } from 'react';

export default class GameForm extends Component {

  state = {
    title: '',
    playTime: '',
    startDate: '',
    endDate: '',
    beaten: false,
    completed: false,
    comment: ''
  }

  handleChange = (event) => {

    if (event.target.type === 'checkbox') {
      const prevValue = this.state[event.target.name]
      this.setState({
        [event.target.name]: !prevValue
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }  
  }

  updateTime = async () => {
    const hours = Number(document.getElementById('hours').value)
    const minutes = Number(document.getElementById('minutes').value)
    const playTime = (hours * 60) + minutes
    this.setState({playTime})
  }

  saveChanges = (event) => {
    event.preventDefault()
    this.props.addGame(this.state)
  }

  render() {
    return (
      <form>
        <label> <span>Title: </span> 
          <input 
            name="title"
            value={this.state.title}
            onChange={this.handleChange} 
            type="text"
            placeholder="Title of the game"
          /> 
        </label>
        <label> <span>Playtime: </span> 
          <input id="hours" type="number" min="0" onChange={this.updateTime}></input>h
          <input id="minutes" type="number" min="0" max="59" onChange={this.updateTime}></input>min
        </label>
        <label> <span>Started at: </span> 
          <input 
            name="startDate"
            value={this.state.startDate}
            onChange={this.handleChange} 
            type="date"
          /> 
        </label>
        <label> <span>Finished at: </span> 
          <input 
            name="endDate"
            value={this.state.endDate}
            onChange={this.handleChange} 
            type="date"
          /> 
        </label>
        <label> <span>Beaten?: </span> 
          <input 
            name="beaten"
            checked={this.state.beaten}
            onChange={this.handleChange}
            type="checkbox"
          /> 
        </label>
        <label> <span>Completed?: </span> 
          <input 
            name="completed"
            checked={this.state.completed}
            onChange={this.handleChange}
            type="checkbox"
          /> 
        </label>
        <label> <span>Comment: </span> 
          <textarea
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange} 
          /> 
        </label>
        <button onClick={this.saveChanges}>Create Game</button>
      </form>
    )
  }
}
