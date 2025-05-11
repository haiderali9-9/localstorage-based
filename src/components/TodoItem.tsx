
import React, { useState, KeyboardEvent } from "react";
import { Todo } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdate(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <div className="flex items-center gap-3 py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-2 group transition-all hover:shadow-md">
      <Checkbox 
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5 text-purple-500 rounded-md"
      />
      
      {isEditing ? (
        <Input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="flex-1"
          autoFocus
        />
      ) : (
        <label 
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "flex-1 cursor-pointer transition-all text-left",
            todo.completed && "text-gray-400 line-through"
          )}
        >
          {todo.text}
        </label>
      )}
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEdit}
            className="h-8 w-8 text-gray-500 hover:text-purple-500"
            title="Edit task"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        
        {isEditing ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSave}
            className="h-8 w-8 text-green-600"
            title="Save changes"
          >
            <Check className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(todo.id)}
            className="h-8 w-8 text-gray-500 hover:text-red-500"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
