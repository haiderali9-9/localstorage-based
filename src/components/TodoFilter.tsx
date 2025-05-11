
import React from "react";
import { FilterStatus } from "@/types/todo";
import { Button } from "@/components/ui/button";

interface TodoFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  onClearCompleted: () => void;
  completedCount: number;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ 
  currentFilter, 
  onFilterChange, 
  onClearCompleted,
  completedCount 
}) => {
  return (
    <div className="flex justify-between items-center mt-4 py-2 text-sm">
      <div className="flex gap-2">
        <Button
          variant={currentFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={currentFilter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("active")}
        >
          Active
        </Button>
        <Button
          variant={currentFilter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </Button>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </Button>
    </div>
  );
};

export default TodoFilter;
