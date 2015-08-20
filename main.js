var FormComponent = React.createClass({
  getInitialState: function() {
    return {
      text: 'hi there'
    };
  },

  inputAction: function(event) {
    this.setState({
      text: event.target.value
    });
  },

  submit: function() {
    var value = { task: this.refs.hi.props.value, status: false, list: 'List 1' };
    
    this.props.onUserSubmit(value);
  },

  newList: function() {
    var title = prompt("Name your new list");
    var item = prompt("Add a todo item");
    var value = { task: item, status: false, list: title };

    this.props.onNewListClick(value);
  },

  render: function() {
    return(
      <div>
        <input type='text' value={this.state.text} onChange={this.inputAction} ref='hi' />
        <input type='submit' onClick={this.submit} />
        <button ref='newlist' onClick={this.newList}>New List</button>
      </div>
      )
    }
});

var ListComponent = React.createClass({

  render: function() {
    var _this = this;
    
    // for (list in this.props.todos.todo) {
      // var title = this.props.todos.todo;
      var obj = this.props.todos;
      var keys = Object.keys(obj);
      var lists = [];

      for (var i = 0; i < keys.length; i++) {
          var val = obj[keys[i]].list;
          if (lists.indexOf(val) < 0) {
            // console.log(lists.indexOf(val));
            lists = lists.concat(val);
          }
          console.log(lists);
      }

      // for (var i=0; i < lists.length ; i++) {

      // }

      return(
        <div>
          <h3>{lists[i]}</h3>
          <ul>
            {this.props.todos.map(
              function(todo, index){
              // if (todo.list === title) { 
                // for (var list in todo) {console.log(todo[list]);}
                return <ToDoItem item={todo.task} key={index} list={todo.list} index={index} status={todo.status} onCheckboxClick={_this.props.onCheckboxClick}/>
              })
            }
          </ul>
        </div>
      )
    // }
  }
});

var ToDoItem = React.createClass({
  getInitialState: function() {
    return {
      checked: this.props.status
    };
  },

  clickCheckbox: function(event) {
    this.setState({
      checked: event.target.checked
    });

    this.props.onCheckboxClick(this.props.index, this.state.checked)
  },

  render: function() {
    return(
      <li key={this.props.key} list={this.props.list} ref='key'>
        {this.props.item}
        <input type='checkbox' checked={this.state.checked} onChange={this.clickCheckbox} ref='checkbox'/>
      </li>
    )
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      todos: [
       {task: 'buy food', status: true, list: 'List 1'},
       {task: 'make food', status: false, list: 'List 1'},
       {task: 'eat food', status: true, list: 'List 2'}
       ] 
    }
  },
  
  onUserSubmit: function(item) {
    this.setState({
      todos: this.state.todos.concat(item)
    })
  },

  onNewListClick: function(value){
    // console.log(value);
    var updatedTodos = this.state.todos.concat(value);
    this.setState({
      todos: updatedTodos
    }
    // ,
    // function() {
    //   console.log(this.state.todos);
    // }
    ) 
  },

  onCheckboxClick: function(index, checked) {
    var copy = this.state.todos.slice();
    // console.log(copy);
    // console.log(index);
    copy[index].status = !checked
    this.setState({
      todos: copy
    })
    // console.log(this.state.todos)
  },

  render: function(){
    return(
      <div>
        <h2>
          To Do App 
        </h2>
        <div>
          <FormComponent onNewListClick={this.onNewListClick} onUserSubmit={this.onUserSubmit}/>
        </div>
        <div id="lists">
          {this.props.lists.map(
            function(todo, index, list){
            // if (todo.list === title) { 
              // for (var list in todo) {console.log(todo[list]);}
              return <ListComponent todos={this.state.todos} onCheckboxClick={this.onCheckboxClick}/>
            })
          }          
        </div>
      </div>
    );
  },
});

React.render(<TodoApp />, document.getElementById('content'));