
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoInput from '../TodoInput';

describe('TodoInput Component', () => {
  it('renders correctly', () => {
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);
    
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onAddTodo when form is submitted with text', () => {
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: 'New todo' } });
    fireEvent.submit(screen.getByRole('form'));
    
    expect(mockAddTodo).toHaveBeenCalledWith('New todo');
    expect(input).toHaveValue('');
  });

  it('does not call onAddTodo when form is submitted with empty text', () => {
    const mockAddTodo = vi.fn();
    render(<TodoInput onAddTodo={mockAddTodo} />);
    
    fireEvent.submit(screen.getByRole('form'));
    
    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
