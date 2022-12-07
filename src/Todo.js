import React, { Component } from 'react';
import './Todo.css';
import './NewTodo.js'

class Todo extends Component {

  constructor(props){
    super(props);
    this.checked = this.checked.bind(this);
    this.remove =this.remove.bind(this);
    this.state ={completed: this.props.completed};
  }
  checked(){
    
    var current = this;
    var id = this.props.id;
    var start = new XMLHttpRequest();
    start.onreadystatechange = function(){
      if (this.readyState === 4 && this.status === 200) {
        console.log("completed")
        current.setState(
          {completed: true}
        );
    }
    else{
      console.log(this.responseText);
    } 
  };
  start.open("PUT","https://cse204.work/todos/" + id, true )
  start.setRequestHeader("x-api-key", "3d3b6b-cbe564-ffd618-b64d7b-4af84e");
  start.setRequestHeader("Content-type", "application/json");
  var data = {
    completed: true
  };
  start.send(JSON.stringify(data));

}
remove(){
  var id = this.props.id;
  var current = this;
  var del = new XMLHttpRequest();
  del.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200) {
      current.props.remove(id);

  }
  else{
    console.log(this.responseText);

  }
};

  
del.open("DELETE","https://cse204.work/todos/" + id, true )
del.setRequestHeader("x-api-key", "3d3b6b-cbe564-ffd618-b64d7b-4af84e");
del.setRequestHeader("Content-type", "application/json");
del.send();

}

  render() {
    var className="todo";
    if (this.state.completed) {
      className = "strikethrough";
    }

    return (
      <div id = {this.props.id} className={className}>
      {/* <ul ClassName="list"> */}
          <li>
            <button type = "checkbox" className="check" onClick={this.checked} >Complete</button>
          <text>{this.props.text} </text>
          <button className = "remove" onClick={this.remove}>Delete</button>
          </li>
      {/* </ul> */}
    </div>
      
  
  

    );
  }
}

export default Todo;
