import React from 'react';
import { Checkbox, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';

interface TaskItemProps {
    id: number;
    title: string;
    completed: boolean;
    favorite: boolean;
    toggleComplete: (id: number) => void;
    toggleFavorite: (id: number) => void;
    deleteTask: (id: number) => void;
}

const TaskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
`;

const TaskItem: React.FC<TaskItemProps> =
    ({ id, title, completed, favorite, toggleComplete, toggleFavorite, deleteTask }) => {
        return (
            <TaskContainer>
                <Checkbox checked={completed} onChange={() => toggleComplete(id)} />
                <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</span>
                <IconButton onClick={() => toggleFavorite(id)}>
                    {favorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
                </IconButton>
                <IconButton onClick={() => deleteTask(id)}>
                    <DeleteIcon color="error" />
                </IconButton>
            </TaskContainer>
        );
    };

export default TaskItem;
