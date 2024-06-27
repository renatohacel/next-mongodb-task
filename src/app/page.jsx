import TaskCard from "@/components/TaskCard";
import Task from "@/models/Task";
import { connectDB } from "@/utils/mongoose";

async function loadTasks() {
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

async function HomePage() {
  const tasks = await loadTasks();
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
