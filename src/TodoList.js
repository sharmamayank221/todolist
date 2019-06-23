import React from 'react';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';

 class TodoList extends React.Component {
	state= {
    todos: [],
    todoToShow: 'all',
    toggleAllComplete: true
   };

   addTodo = (todo) => {
    this.setState(state => ({
    	todos: [todo, ...state.todos]
    }))
   };
   
   toggleComplete = (id) => {
     this.setState({
     	todos: this.state.todos.map(todo => {
     		if (todo.id === id) {
                return {
                 ...todo,
                 complete: !todo.complete
                }
     		} else {
     			return todo;
     		}
     	})
     })
   }

  updateTodoToShow = (s) => {
   this.setState({
   	 todoToShow: s
   })
  }

  handleDeleteToDO = (id) => {
    this.setState({
    	todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }


  removeAllToDoThatAreComplete = () => {
    this.setState({
    	todos: this.state.todos.filter(todo => !todo.complete)
    })
  }

	render() {
     let todos = [];
     if (this.state.todoToShow === 'all') {
       todos = this.state.todos;
     } else if (this.state.todoToShow === 'active') {
       todos = this.state.todos.filter(todo => !todo.complete);
     }
      else if (this.state.todoToShow === 'complete') {
      todos = this.state.todos.filter(todo => todo.complete);
      }

		return (
			<div>
			<TodoForm onSubmit={this.addTodo} />
		    {todos.map(todo => (
		      <Todo 
		      key={todo.id} 
		      toggleComplete={() =>this.toggleComplete(todo.id)} 
		      onDelete={() => this.handleDeleteToDO(todo.id)}
		      todo={todo} />))}
		    <div>todos left: {this.state.todos.filter(todo => !todo.complete).length}</div>
		    <div>
		    	<button onClick={() => this.updateTodoToShow("all")} >all</button>
		    	<button onClick={() => this.updateTodoToShow("active")}>active</button>
		    	<button onClick={() => this.updateTodoToShow("complete")}>complete</button>
		    </div>
		     {this.state.todos.some(todos => todos.complete) ? <div>
		       <button onClick={this.removeAllToDoThatAreComplete}>remove all complete todos</button>
		     </div> : null}
		     <div>
		     	<button onClick={() => 
		     	     this.setState({
		     	     	todos: this.state.todos.map(todo =>({
		     	     		...todo,
		     	     		complete: this.state.toggleAllComplete
		     	     	})),
		     	     	toggleAllComplete: !this.state.toggleAllComplete
		     	     })
		     	    }
		     	>toggleallcomplete: {`${this.state.toggleAllComplete}`}</button>
		     </div>
		</div>
		);
	}
}

export default TodoList;