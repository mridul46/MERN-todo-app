


const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const isCompleted = task.complete;

  return (
    <div
      className={`p-6 rounded-xl shadow-lg border border-gray-600 bg-gray-800 flex justify-between items-start transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        isCompleted ? "bg-emerald-900/50" : "bg-gray-800"
      }`}
    >
      <div className="flex flex-col gap-3">
        <h3
          className={`font-semibold text-lg text-gray-200 ${
            isCompleted ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={`text-sm text-gray-300 ${
              isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-xs bg-blue-800 text-blue-200 px-3 py-1 rounded-full">
            {task.category || "Other"}
          </span>
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              task.priority === "High"
                ? "bg-red-800 text-red-200"
                : task.priority === "Medium"
                ? "bg-yellow-800 text-yellow-200"
                : "bg-green-800 text-green-200"
            }`}
          >
            {task.priority}
          </span>
          <span className="text-xs bg-gray-700 text-gray-200 px-3 py-1 rounded-full">
            Due: {task.due_date ? new Date(task.due_date).toDateString() : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex gap-4 items-center ml-4">
        <button
          onClick={() => onToggle(task._id)}
          className="text-emerald-400 hover:text-emerald-300 hover:scale-125 transition-all duration-200"
          title="Mark Complete"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <button
          onClick={() => onEdit?.(task)}
          className="text-blue-400 hover:text-blue-300 hover:scale-125 transition-all duration-200"
          title="Edit Task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-400 hover:text-red-300 hover:scale-125 transition-all duration-200"
          title="Delete Task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M7 7h10"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;