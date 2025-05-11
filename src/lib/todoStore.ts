
import { Todo } from "@/types/todo";

const STORAGE_KEY = "todos_app_data";

export const getTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  if (!storedTodos) return [];
  
  try {
    return JSON.parse(storedTodos);
  } catch (error) {
    console.error("Error parsing todos from localStorage:", error);
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  console.log("Saved todos:", todos);
};

export const addTodo = (text: string): Todo[] => {
  const todos = getTodos();
  const newTodo: Todo = {
    id: Date.now().toString(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };
  
  const updatedTodos = [newTodo, ...todos];
  saveTodos(updatedTodos);
  return updatedTodos;
};

export const toggleTodo = (id: string): Todo[] => {
  const todos = getTodos();
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      console.log(`Toggling todo ${id} from ${todo.completed} to ${!todo.completed}`);
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  
  saveTodos(updatedTodos);
  return updatedTodos;
};

export const updateTodoText = (id: string, text: string): Todo[] => {
  const todos = getTodos();
  const updatedTodos = todos.map((todo) => 
    todo.id === id ? { ...todo, text: text.trim() } : todo
  );
  
  saveTodos(updatedTodos);
  return updatedTodos;
};

export const deleteTodo = (id: string): Todo[] => {
  const todos = getTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  
  saveTodos(updatedTodos);
  return updatedTodos;
};

export const clearCompleted = (): Todo[] => {
  const todos = getTodos();
  const updatedTodos = todos.filter((todo) => !todo.completed);
  
  saveTodos(updatedTodos);
  return updatedTodos;
};
