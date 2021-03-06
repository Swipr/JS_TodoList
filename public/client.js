var todoList = {
  
  todos: [],
  addTodos: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodosText: function(position,newTodoText){
    this.todos[position].todoText= newTodoText;
  },
  deleteTodos: function(position){
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(toggle){
    if (!this.todos[toggle].completed) {
      this.todos[toggle].completed = true;

    }
    else {
      this.todos[toggle].completed = false;

    }
  },
  
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    this.todos.forEach(function(todo) {
      if (todo.completed) {
        completedTodos++;
      }
    });
    
      this.todos.forEach(function(todo) {
        if (completedTodos === totalTodos){
          todo.completed = false;
        }
        else {
          todo.completed = true;
        }
      });
  }
};


var handlers = {
  addTodo: function(){
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodos(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function(){
   var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
   var changeTodoTextInput = document.getElementById("changeTodoTextInput");
   todoList.changeTodosText(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
   changeTodoPositionInput.value = "";
   changeTodoTextInput.value = "";
   view.displayTodos();
  },
  deleteTodo: function(position){
   todoList.deleteTodos(position);
   view.displayTodos();
  },
  toggleTodo: function(){
   var toggleTodoPosition = document.getElementById("toggleTodoPositionInput");
   todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
   toggleTodoPositionInput.value = "";
   view.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";
      
      if (todo.completed) {
        todoTextWithCompletion = "(x) " + todo.todoText;
      }
      else {
        todoTextWithCompletion = "( ) " + todo.todoText;
      };
      
      todo.id = position;
      todoLi.textContent = todoTextWithCompletion + " ";
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
      }, this);
                           },
                           
                           
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event){
    var elementClicked = event.target;
    if (elementClicked.className === "deleteButton") {
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }  
    });
  }
  
};


todoList.addTodos("item1");
todoList.changeTodosText(0, "item6");
//todoList.deleteTodos(0);
todoList.addTodos("items34");
todoList.toggleCompleted(0);
view.displayTodos();
view.setUpEventListeners();

