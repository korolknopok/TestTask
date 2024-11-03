import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useTaskStore } from '../store/taskStore';

const AddTask: React.FC = () => {
    const [title, setTitle] = useState('');
    const addTask = useTaskStore((state) => state.addTask);
    const fetchTasks = useTaskStore((state) => state.fetchTasks); // Функция для повторной загрузки задач

    const handleAddTask = async () => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;

        await addTask(trimmedTitle, '');
        setTitle('');
        await fetchTasks(); // Обновляем задачи после добавления
    };

    return (
        <Box display="flex" flexDirection="row" sx={{ flex: 1, mr: 2}}>
            <TextField
                variant="outlined"
                label="New Task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ flex: 1, mr: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddTask}>
                Add Task
            </Button>
        </Box>
    );
};

export default AddTask;
