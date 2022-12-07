import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (

     
    <div className="NewTodo" >
 
        <form id="input" onSubmit={this.props.add}>
          
        <input type="text" id="add" placeholder="Add Item" value={this.props.input} onChange={this.props.onChange}/>
        <input type="submit" id="addbutton" /> 

        
    </form>
    </div>
    


    );
    }
  }
  
  export default NewTodo;