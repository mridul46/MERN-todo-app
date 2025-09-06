import React from "react";
import { CheckCircle, Clock, ListTodo } from "lucide-react";

const Stats = ({ tasks = [] }) => {
  const completed = tasks.filter((t) => t.complete).length;
  const pending = tasks.length - completed;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
      <div
        className={`flex flex-col items-center p-6 rounded-xl shadow-md border border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in ${
          completed > 0 ? "bg-emerald-800 opacity-70" : "bg-emerald-900/50"
        }`}
        style={{ animationDelay: "0ms" }}
      >
        <CheckCircle className="text-emerald-400 mb-3" size={28} />
        <h4 className="font-semibold text-gray-200">Completed</h4>
        <p className="text-2xl font-semibold text-gray-100">{completed}</p>
      </div>

      <div
        className="flex flex-col items-center bg-yellow-900/50 p-6 rounded-xl shadow-md border border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <Clock className="text-yellow-400 mb-3" size={28} />
        <h4 className="font-semibold text-gray-200">Pending</h4>
        <p className="text-2xl font-semibold text-gray-100">{pending}</p>
      </div>

      <div
        className="flex flex-col items-center bg-blue-900/50 p-6 rounded-xl shadow-md border border-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <ListTodo className="text-blue-400 mb-3" size={28} />
        <h4 className="font-semibold text-gray-200">Total Tasks</h4>
        <p className="text-2xl font-semibold text-gray-100">{tasks.length}</p>
      </div>
    </div>
  );
};

export default Stats;