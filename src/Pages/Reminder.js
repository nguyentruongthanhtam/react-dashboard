import React, { Component } from 'react';
import moment from 'moment';
import PouchDB from 'pouchdb-browser';
import posed from 'react-pose'
const Note = posed.div({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: ({ i }) => ({delay: i*50})
  },
  props: {i: 0}
});
var db = new PouchDB('reminder');
class Reminder extends Component {
  state = {
    note: '',
    time: null,
    board: null,
    noteAdded: false
  }
  componentDidMount(){
    this.loadDB();
    db.changes({since: 'now',live: true, include_docs: true})
        .on('change',()=>{
          this.setState({noteAdded: false})
          this.loadDB();
          
        })
  }
  loadDB = () => {
    db.allDocs({include_docs: true})
    .then((res)=>{
      this.setState({board: res.rows})
      this.setState({noteAdded: true})
    }).catch(err=>{
      console.log(err)
    });
  }
  saveNote = (e) => {
    e.preventDefault();
    let time = this.state.time
    let note = this.state.note
    let reminder =  {
                  _id: new Date().toJSON(),
                  addedAt: time,
                  content: note
                }
    db.put(reminder,(err,result)=>{
      if(!err){
        console.log("Saved Note successfully!")
      }
      else 
        console.log("Error", err)
    })
  }
  deleteNote =(index) => {    
    if(window.confirm("Want to delete this for sure?"))
    {
      db.remove(index).catch(err=>{console.log(err)})
    }
  }
  renderBoard = () => {
    
    let board = this.state.board
    return(
      <div className="Board">
        {board?board.map((n,index)=><Note key={n.doc._id} pose={this.state.noteAdded?'visible': 'hidden'} i={index}><h1>{n.doc.content}</h1><span>{n.doc.addedAt}</span><div className="del" onClick={e=>this.deleteNote(n.doc)}>X</div></Note>):"No note to show"}
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
  
