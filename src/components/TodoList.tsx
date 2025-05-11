
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
import { useToast } from "@/hooks/use-toast";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const { toast } = useToast();

  // Load todos from localStorage on initial render
  useEffect(() => {
    const loadedTodos = getTodos();
    console.log("Loaded todos:", loadedTodos);
    setTodos(loadedTodos);
  }, []);

  const handleAddTodo = (text: string) => {
    const updatedTodos = addTodo(text);
    setTodos(updatedTodos);
    toast({
      title: "Task added",
      description: "Your task has been added successfully."
    });
  };

  const handleToggle = (id: string) => {
    console.log(`Toggling todo ${id}`);
    const updatedTodos = toggleTodo(id);
    setTodos(updatedTodos);
  };

  const handleUpdateText = (id: string, text: string) => {
    const updatedTodos = updateTodoText(id, text);
    setTodos(updatedTodos);
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully."
    });
  };

  const handleDelete = (id: string) => {
    const updatedTodos = deleteTodo(id);
    setTodos(updatedTodos);
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully."
    });
  };

  const handleClearCompleted = () => {
    const updatedTodos = clearCompleted();
    setTodos(updatedTodos);
    toast({
      title: "Completed tasks cleared",
      description: "All completed tasks have been removed."
    });
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" filter
  });

  console.log("Current filter:", filter);
  console.log("Filtered todos:", filteredTodos);
  console.log("Completed todos:", todos.filter(todo => todo.completed).length);

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="w-full max-w-md mx-auto">
      <TodoInput onAddTodo={handleAddTodo} />

      {filteredTodos.length > 0 ? (
        <div className="space-y-2 mb-4">
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
        <div className="text-center p-8 text-gray-500">
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
        totalCount={todos.length}
      />
    </div>
  );
};

export default TodoList;
