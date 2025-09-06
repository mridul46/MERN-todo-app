import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api.js";
import TaskCard from "../Components/TaskCard";
import TaskForm from "../Components/TaskForm";
import Stats from "../Components/Stats";
import EditTaskModal from "../Components/EditTaskModal";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [userName, setUserName] = useState(""); // fetch only from backend
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(res.data.data.user.name || "User"); // set from backend
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    const fetchTasks = async () => {
      try {
        const res = await API.get("/task/get-task", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchTasks();
  }, [navigate]);

  const addTask = async (newTask) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/task/add-task", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([res.data.data.task, ...tasks]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.patch(`/task/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((t) => (t._id === id ? res.data.data.task : t)));
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.put(`/task/${updatedTask._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? res.data.data.task : t)));
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "pending" && !task.completed);
    const matchesPriority =
      filterPriority === "all" ||
      task.priority.toLowerCase() === filterPriority.toLowerCase();
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading)
    return (
      <div className="p-8 min-h-screen bg-gray-900">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded-lg w-1/3"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-gray-700 rounded-lg w-1/2"></div>
            <div className="h-12 bg-gray-700 rounded-lg w-24"></div>
            <div className="h-12 bg-gray-700 rounded-lg w-24"></div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-700 rounded-xl shadow-md"></div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-gray-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <h2 className="text-4xl font-bold text-gray-200">
          Hello {userName} 👋, Start planning today
        </h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search tasks or priority..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300 w-full sm:w-64"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:from-blue-500 focus:to-purple-500 transition-all duration-300"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Task Form */}
      <div className="mt-8">
        <TaskForm onSubmit={addTask} />
      </div>

      {/* Task List */}
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <div
              key={task._id}
              className="transform hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TaskCard
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={setEditingTask}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center border border-dashed rounded-xl border-gray-600 bg-gray-800 shadow-md">
            <p className="text-lg font-medium text-gray-300">
              {searchQuery || filterStatus !== "all" || filterPriority !== "all"
                ? "No tasks match your search or filters."
                : "No tasks yet. Add your first task!"}
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-10">
        <Stats tasks={tasks} />
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={updateTask}
        />
      )}
    </div>
  );
};

export default Home;
