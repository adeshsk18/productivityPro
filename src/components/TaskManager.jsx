import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    status: 'pending'
  });

  // Add a new task
  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { 
        ...newTask, 
        id: Date.now(),
        createdAt: new Date().toISOString()
      }]);
      // Reset form
      setNewTask({
        title: '',
        description: '',
        deadline: '',
        priority: 'medium',
        status: 'pending'
      });
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Update task status
  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="page-container">
      <h1>Task Manager</h1>
      
      <div className="task-input">
        <input 
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
        />
        <textarea 
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
        />
        <input 
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
        />
        <select 
          value={newTask.priority}
          onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <div className="task-actions">
              <select 
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
