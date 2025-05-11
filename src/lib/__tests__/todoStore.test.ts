
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  getTodos, 
  addTodo, 
  toggleTodo, 
  updateTodoText, 
  deleteTodo, 
  clearCompleted 
} from '../todoStore';

describe('Todo Store', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      clear: () => {
        store = {};
      }
    };
  })();

  beforeEach(() => {
    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.clear();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('should add a new todo', () => {
    const todos = addTodo('Test todo');
    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe('Test todo');
    expect(todos[0].completed).toBe(false);
  });

  it('should toggle a todo', () => {
    const todos = addTodo('Test todo');
    const todoId = todos[0].id;
    
    // Toggle to completed
    const toggledTodos = toggleTodo(todoId);
    expect(toggledTodos[0].completed).toBe(true);
    
    // Toggle back to incomplete
    const toggledBackTodos = toggleTodo(todoId);
    expect(toggledBackTodos[0].completed).toBe(false);
  });

  it('should update todo text', () => {
    const todos = addTodo('Original text');
    const todoId = todos[0].id;
    
    const updatedTodos = updateTodoText(todoId, 'Updated text');
    expect(updatedTodos[0].text).toBe('Updated text');
  });

  it('should delete a todo', () => {
    const todos = addTodo('Test todo');
    const todoId = todos[0].id;
    
    const remainingTodos = deleteTodo(todoId);
    expect(remainingTodos).toHaveLength(0);
  });

  it('should clear completed todos', () => {
    addTodo('Todo 1');
    const todos2 = addTodo('Todo 2');
    const todoId = todos2[0].id;
    
    // Mark the second todo as completed
    toggleTodo(todoId);
    
    const remainingTodos = clearCompleted();
    expect(remainingTodos).toHaveLength(1);
    expect(remainingTodos[0].text).toBe('Todo 1');
  });

  it('should get todos from localStorage', () => {
    addTodo('Test todo');
    
    // Get todos should retrieve from localStorage
    const todos = getTodos();
    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe('Test todo');
  });
});
