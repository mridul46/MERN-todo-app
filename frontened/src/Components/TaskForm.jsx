import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, category, priority, dueDate });

    // Reset fields
    setTitle("");
    setDescription("");
    setCategory("Other");
    setPriority("Low");
    setDueDate(new Date());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-6 rounded-lg shadow-md bg-gray-800 border border-gray-600"
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="col-span-2 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
        required
      />

      <input
        type="text"
        placeholder="Task Details"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="col-span-2 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
      >
        <option value="Work">Work</option>
        <option value="Study">Study</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Calendar Picker */}
      <div className="relative col-span-2 sm:col-span-1">
        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600 transition-all duration-300 w-full text-left"
        >
          {dueDate.toDateString()}
        </button>
        {showCalendar && (
          <div className="absolute z-10 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg animate-fade-in p-2">
            <Calendar
              onChange={(date) => {
                setDueDate(date);
                setShowCalendar(false);
              }}
              value={dueDate}
              className="bg-gray-800 text-gray-200 rounded-lg shadow-md"
              tileClassName={({ date, view }) => {
                const today = new Date();
                if (
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth() &&
                  date.getFullYear() === today.getFullYear()
                ) {
                  return "bg-blue-600 text-white rounded-full";
                }
                if (
                  date.getDate() === dueDate.getDate() &&
                  date.getMonth() === dueDate.getMonth() &&
                  date.getFullYear() === dueDate.getFullYear()
                ) {
                  return "bg-emerald-600 text-white rounded-full";
                }
              }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-all duration-300 col-span-2 sm:col-span-1 hover:shadow-md"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
