
import React, { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
  placeholder?: string;
}

const TodoInput: React.FC<TodoInputProps> = ({ 
  onAddTodo, 
  placeholder = "Add a new task..." 
}) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text.trim()) {
      onAddTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1"
        autoFocus
      />
      <Button 
        type="submit" 
        disabled={!text.trim()}
        className="bg-purple-500 hover:bg-purple-600"
      >
        <Plus className="h-5 w-5" />
        <span className="sr-only">Add Task</span>
      </Button>
    </form>
  );
};

export default TodoInput;
