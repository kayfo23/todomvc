
// BUGS:



var todoList = {  //model/data
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

var handlers = {  // controllers
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    if (addTodoTextInput.value !== '') {
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
    }
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(index) {
    todoList.toggleCompleted(index);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }, 

  editItem: function(elementClicked) { //called when edit button is clicked
    var siblings = elementClicked.parentNode.childNodes;
    view.switchToEditMode(siblings);

  },

  submitChange: function(elementClicked) { // called when submit edit button is clicked
    var listItem = elementClicked.parentNode;
    var siblings = listItem.childNodes;
    
    //get editBox value & current todo value
    var editorValue;
    var todoLabel;
    siblings.forEach(function(sibling) {
      if (sibling.classList.contains("editBox")) {
        editorValue = sibling.value;
      } else if (sibling.classList.contains("todoText")) {
        todoLabel = sibling;
      }
    });

    if (editorValue === '') {
      this.deleteTodo(listItem.id); //'this' refers to handlers object
    } else {
      todoLabel.innerHTML = editorValue; //update todo value
      todoList.changeTodo(listItem.id, editorValue); //update storages

      //switch back to regular view - need 'switchtoLabelMode' func or just call view.displayTodos?
      view.closeEditMode(siblings); 
    }

  },

  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target;

      if (elementClicked.classList.contains('checkbox')) {
        handlers.toggleCompleted(elementClicked.parentNode.id);
        elementClicked.checked = true;
      }
      if (elementClicked.classList.contains('editButton')) {
        handlers.editItem(elementClicked);
      }
      if (elementClicked.classList.contains('submitEditButton')) {
        handlers.submitChange(elementClicked);
      }
      if (elementClicked.classList.contains('deleteButton')) {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }

    });
  } 
};

var view = {  // view
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      todoLi.id = position;

      todoLi.appendChild(this.createCheckbox(todo));
      todoLi.appendChild(this.createTodoText(todo));
      todoLi.appendChild(this.createEditBox(todo));
      todoLi.appendChild(this.createEditButton());
      todoLi.appendChild(this.createSubmitEditButton());
      todoLi.appendChild(this.createDeleteButton());

      todosUl.appendChild(todoLi);
    }, this);
  },

  createCheckbox: function(todo) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox display";
    if (todo.completed === true) { //link completed status with checkmark
      checkbox.checked = true;
    }
    return checkbox;
  },
  createTodoText: function(todo) {
    var text = document.createElement("label");
    text.textContent = todo.todoText;
    text.className = 'todoText display';
    return text;
  },
  createEditBox: function(todo) {
    var editBox = document.createElement("input");
    editBox.value = todo.todoText;
    editBox.className = 'editBox hide';  //set to hidden until switchToEditMode is called
    return editBox;
  },
  createEditButton: function() {
    var editButton = document.createElement("button");
    editButton.textContent = 'edit';
    editButton.className = 'editButton display';
    return editButton;
  },
  createSubmitEditButton: function() {
    var submitEditButton = document.createElement("button");
    submitEditButton.textContent = 'ok';
    submitEditButton.className = 'submitEditButton hide'; //set to hidden until switchToEditMode is called
    return submitEditButton;
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton display';    
    return deleteButton;
  },

  switchToEditMode: function(listItemElements) {
    //hide checkbox, label, and edit button (leave delete visible)
    //unhide editBox & submitEditButton
    listItemElements.forEach(function(element) {
      if (element.classList.contains("display")) {
        //element.classList.add("hide"); //the class is added but is not hiding the elements
        element.style.display = "none";

      }
      if (element.classList.contains("hide")) {
        element.classList.remove("hide");
        if (element.classList.contains("editBox")) {
          element.focus();
        }
      }
    });
  },

  closeEditMode: function(listItemElements) {
    //rehide editBox & submitEditButton
    //change diplay style of elements containing display class
    listItemElements.forEach(function(element) {
      if (element.classList.contains("display")) {
        element.style.display = "inline";
      } else {
        element.classList.add("hide");
      }
    });
  }
  
};

handlers.setUpEventListeners();











