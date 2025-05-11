
import React from "react";
import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container max-w-md mx-auto px-4">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Simple Todo App</h1>
          <p className="text-gray-600 text-sm">Your tasks are saved in localStorage</p>
        </header>
        
        <main className="bg-white rounded-lg shadow p-6">
          <TodoList />
        </main>
      </div>
    </div>
  );
};

export default Index;
