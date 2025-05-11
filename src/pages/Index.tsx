
import React from "react";
import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Todo App</h1>
          <p className="text-gray-600">Organize your tasks with ease</p>
        </header>
        
        <main className="bg-white rounded-xl shadow-md p-6 mx-auto max-w-md">
          <TodoList />
        </main>
        
        <footer className="mt-10 text-center text-sm text-gray-500">
          <p>Your tasks are saved automatically in your browser's localStorage</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
