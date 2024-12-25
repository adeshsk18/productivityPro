import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProjectManager from './pages/ProjectManager';
import NoteTaker from './pages/NoteTaker';
import {
  Container, TextField, Button, Select, MenuItem, Card, CardContent, Typography, IconButton, Box, Modal
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Snackbar, Alert } from '@mui/material';
import './App.css';
import Footer from './components/Footer';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import Register from './components/Register';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: null, // Use `null` for DatePicker compatibility
    priority: 'medium',
    status: 'pending'
  });

  const [editTask, setEditTask] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const addTask = () => {
    if (newTask.title.trim()) {
      setTasks([
        { 
          ...newTask, 
          id: Date.now(),
          createdAt: new Date().toISOString()
        },
        ...tasks
      ]);
      setNewTask({
        title: '',
        description: '',
        deadline: null,
        priority: 'medium',
        status: 'pending'
      });
    }
  };

  const saveEditTask = () => {
    setTasks(tasks.map(task => 
      task.id === editTask.id ? editTask : task
    ));
    setEditTask(null);
    setSnackbar({
      open: true,
      message: 'Task updated successfully!',
      severity: 'success'
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <NavBar />

        {/* Main Content */}
        <Container maxWidth="md" style={{ marginTop: '5rem' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" />} />
              <Route path="/tasks" element={
                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    mb="2rem"
                    component="form"
                  >
                    <TextField 
                      label="Task Title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                    <TextField 
                      label="Task Description"
                      value={newTask.description}
                      multiline
                      rows={3}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                    <DatePicker
                      label="Select Deadline"
                      value={newTask.deadline}
                      onChange={(newDate) => setNewTask({...newTask, deadline: newDate})}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <Select 
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    >
                      <MenuItem value="low">Low Priority</MenuItem>
                      <MenuItem value="medium">Medium Priority</MenuItem>
                      <MenuItem value="high">High Priority</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={addTask}>Add Task</Button>
                  </Box>
                  
                  <Box display="flex" flexDirection="column" gap="1rem">
                    {tasks.map(task => (
                      <Card key={task.id}>
                        <CardContent>
                          <Typography variant="h6">{task.title}</Typography>
                          <Typography>{task.description}</Typography>
                          <Typography>
                            Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}
                          </Typography>
                          <Typography>Priority: {task.priority}</Typography>
                          <Typography>Status: {task.status}</Typography>
                          <Box display="flex" justifyContent="space-between" mt="1rem">
                            <Select 
                              value={task.status}
                              onChange={(e) => setTasks(tasks.map(t => 
                                t.id === task.id ? { ...t, status: e.target.value } : t
                              ))}
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="in-progress">In Progress</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                            <Box>
                              <IconButton onClick={() => setEditTask(task)}>
                                <Edit />
                              </IconButton>
                              <IconButton onClick={() => deleteTask(task.id)}>
                                <Delete />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              } />
              <Route path="/projects" element={<ProjectManager />} />
              <Route path="/notes" element={<NoteTaker />} />
            </Routes>
          </LocalizationProvider>
        </Container>

        {/* Edit Modal */}
        <Modal open={!!editTask} onClose={() => setEditTask(null)}>
          <Box
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '50%', padding: '1rem', backgroundColor: 'white', borderRadius: '8px'
            }}
          >
            {editTask && (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box display="flex" flexDirection="column" gap="1rem">
                  <TextField 
                    label="Edit Title"
                    value={editTask.title}
                    onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  />
                  <TextField 
                    label="Edit Description"
                    value={editTask.description}
                    multiline
                    rows={3}
                    onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  />
                  <DatePicker
                    label="Edit Deadline"
                    value={editTask.deadline}
                    onChange={(newDate) => setEditTask({ ...editTask, deadline: newDate })}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Button variant="contained" onClick={saveEditTask}>Save</Button>
                </Box>
              </LocalizationProvider>
            )}
          </Box>
        </Modal>
      </div>
      <AuthProvider>
        
          <NavBar />
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <ProjectManager tasks={tasks} setTasks={setTasks} />
                </ProtectedRoute>
              } />
              <Route path="/notes" element={
                <ProtectedRoute>
                  <NoteTaker />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </Container>
        
      </AuthProvider>
      <Snackbar 
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  // Add this line
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}  // Add this for better styling
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </Router>
    
  );
}

export default App;