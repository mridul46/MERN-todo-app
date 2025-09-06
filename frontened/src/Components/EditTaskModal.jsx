import { useState, useEffect } from "react";

export default function EditTaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setCategory(task.category || "Other");
      setPriority(task.priority || "Low");
      setDueDate(task.due_date ? task.due_date.split("T")[0] : "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      description,
      category,
      priority,
      due_date: dueDate,
    });
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300 min-h-[100px]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          >
            <option value="Work">Work</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          />
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-600 text-gray-200 hover:bg-gray-500 transition-all duration-300 hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-all duration-300 hover:shadow-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}