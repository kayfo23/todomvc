//TODO
  //remove position input & Toggle Completed button
  //BUG: check that when box is checked completed = true
  //BUG: checkbox is left unchecked again after check



var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function(event) {
    var isChecked = document.getElementById('toggle-all').checked;
    
    this.todos.forEach(function(todo) {
      todo.completed = isChecked;
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },

  //place this on each checkbox - remove need for inputing position index
    //instead of being given input index, need to access via determining 
    //which id is tied with the button was clicked 
  toggleCompleted: function(index) {
    //var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    //todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    todoList.toggleCompleted(index);
    //toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      todoLi.id = position;

      todoLi.appendChild(this.createCheckbox(todo));
      todoLi.appendChild(this.createTodoText(todo));
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  
  createCheckbox: function(todo) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    if (todo.completed === true) {
      checkbox.checked = true;
    }
    return checkbox;
  },

  createTodoText: function(todo) {
    var text = document.createElement("p");
    text.textContent = todo.todoText;
    return text;
  },

  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';    
    return deleteButton;
  },

  //Event Delegation
  setUpEventListeners: function() {

    // var deleteBut = document.getElementById('deleteButton');
    // deleteBut.addEventListener('click', function(event) {
    //   console.log(event.target);
    //   handlers.deleteTodo(parseInt(event.target.parentNode.id));  //still need to fix
    // });
    // var checkboxBut = document.querySelector('.checkbox');
    // checkboxBut.addEventListener('click', function(event) {
    //   var index = event.target.parentNode.id;
    //   handlers.toggleCompleted(index);
    // });

    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {

      var elementClicked = event.target;

      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
      if (elementClicked.className === 'checkbox') {
        handlers.toggleCompleted(elementClicked.parentNode.id);
        elementClicked.checked = true; //why is it not remaining checked?
      }
    });

    // todosUl.addEventListener ==> double click on text area to edit todo item
    
  }
};

view.setUpEventListeners();











