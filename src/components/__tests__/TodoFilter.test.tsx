
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoFilter from '../TodoFilter';
import { FilterStatus } from '@/types/todo';

describe('TodoFilter Component', () => {
  it('renders correctly with all filter options', () => {
    const mockFilterChange = vi.fn();
    const mockClearCompleted = vi.fn();
    
    render(
      <TodoFilter 
        currentFilter="all" 
        onFilterChange={mockFilterChange} 
        onClearCompleted={mockClearCompleted}
        completedCount={2}
      />
    );
    
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear completed' })).toBeInTheDocument();
  });

  it('calls onFilterChange when filter buttons are clicked', () => {
    const mockFilterChange = vi.fn();
    const mockClearCompleted = vi.fn();
    
    render(
      <TodoFilter 
        currentFilter="all" 
        onFilterChange={mockFilterChange} 
        onClearCompleted={mockClearCompleted}
        completedCount={2}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(mockFilterChange).toHaveBeenCalledWith('active');
    
    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
    expect(mockFilterChange).toHaveBeenCalledWith('completed');
    
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(mockFilterChange).toHaveBeenCalledWith('all');
  });

  it('calls onClearCompleted when clear completed button is clicked', () => {
    const mockFilterChange = vi.fn();
    const mockClearCompleted = vi.fn();
    
    render(
      <TodoFilter 
        currentFilter="all" 
        onFilterChange={mockFilterChange} 
        onClearCompleted={mockClearCompleted}
        completedCount={2}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: 'Clear completed' }));
    expect(mockClearCompleted).toHaveBeenCalled();
  });

  it('disables clear completed button when completedCount is 0', () => {
    const mockFilterChange = vi.fn();
    const mockClearCompleted = vi.fn();
    
    render(
      <TodoFilter 
        currentFilter="all" 
        onFilterChange={mockFilterChange} 
        onClearCompleted={mockClearCompleted}
        completedCount={0}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Clear completed' })).toBeDisabled();
  });
});
