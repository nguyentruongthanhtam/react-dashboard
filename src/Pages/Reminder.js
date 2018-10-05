import React, { Component } from 'react';
import moment from 'moment';
class Reminder extends Component {
  state = {
    note: '',
    time: null,
    board: []
  }
  saveNote = (e) => {
    e.preventDefault();
    let board = this.state.board
    let time = this.state.time
    let note = this.state.note
    if(time && note)
    board.push(
      {
        addedAt: time,
        content: note
      }
    )
    this.setState(board)
  }
  deleteNote =(index) => {
    // e.preventDefault();
    let board = this.state.board;
    board.splice(index,1);
    this.setState(board: board);
  }
  renderBoard = () => {
    let board = this.state.board
    return(
      <div className="Board">
        {board?board.map((n,index)=><div key={index}><h1>{n.content}</h1><span>{n.addedAt}</span><div className="del" onClick={e=>this.deleteNote(index)}>X</div></div>):"No note to show"}
      </div>
    )
  }
  renderNote = () => {
    let note = this.state.note; 
    return(
      <form onSubmit={e => this.saveNote(e)}>
        <input type="datetime-local" name="time" id="time" onChange={e=>this.setState({time: e.target.value})} />
        <textarea row="5" maxLength="200" required name="note" value={note}  onChange={e=>this.setState({note: e.target.value})} placeholder="Note"></textarea>
        <button type="submit">Save</button>
      </form>
    )
  }
  render() {
    
    return (
      <div className="Reminder Content-Wrapper">
        {this.renderBoard()}
        {this.renderNote()}   
      </div>
    );
  }
}

export default Reminder;
  
