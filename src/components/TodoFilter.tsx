
import React from "react";
import { FilterStatus } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  onClearCompleted: () => void;
  completedCount: number;
  totalCount: number;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ 
  currentFilter, 
  onFilterChange, 
  onClearCompleted,
  completedCount,
  totalCount
}) => {
  const filters: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  const itemsLeftText = totalCount === 0
    ? "No tasks"
    : totalCount === 1
      ? "1 task"
      : `${totalCount} tasks`;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 py-2 px-1 text-sm">
      <div className="text-gray-500 mb-3 sm:mb-0">
        {itemsLeftText}
      </div>
      
      <div className="flex gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "px-3 py-1 rounded-md",
              currentFilter === filter.value
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-gray-500 hover:text-red-500 mt-3 sm:mt-0"
      >
        Clear completed
      </Button>
    </div>
  );
};

export default TodoFilter;
