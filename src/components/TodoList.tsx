
import React, { useState, useEffect } from "react";
import { Todo, FilterStatus } from "@/types/todo";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import { 
  getTodos, 
  addTodo, 
  toggleTodo, 
  updateTodoText, 
  deleteTodo, 
  clearCompleted 
} from "@/lib/todoStore";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const handleAddTodo = (text: string) => {
    const updatedTodos = addTodo(text);
    setTodos(updatedTodos);
  };

  const handleToggle = (id: string) => {
    const updatedTodos = toggleTodo(id);
    setTodos(updatedTodos);
  };

  const handleUpdateText = (id: string, text: string) => {
    const updatedTodos = updateTodoText(id, text);
    setTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const updatedTodos = deleteTodo(id);
    setTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    const updatedTodos = clearCompleted();
    setTodos(updatedTodos);
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" filter
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="w-full">
      <TodoInput onAddTodo={handleAddTodo} />

      {filteredTodos.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdateText}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-4 text-gray-500 border rounded-md">
          {filter === "all" 
            ? "No tasks yet. Add a task to get started!" 
            : filter === "active" 
              ? "No active tasks. All caught up!"
              : "No completed tasks."}
        </div>
      )}

      <TodoFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        onClearCompleted={handleClearCompleted}
        completedCount={completedCount}
      />
    </div>
  );
};

export default TodoList;
