import React, { Component } from 'react';

export default class GameForm extends Component {

  state = {
    title: '',
    playtime: '',
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

  saveChanges = (event) => {
    event.preventDefault()
    this.props.addGame(this.state)
    console.log(this.state)
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
          <input 
            name="playtime"
            value={this.state.playtime}
            onChange={this.handleChange} 
            type="time"
          /> 
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
