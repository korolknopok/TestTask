import React, { useState } from 'react';
import { Checkbox, IconButton, CircularProgress } from '@mui/material';
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

const TaskContent = styled.div`
    display: flex;
    align-items: center;
`;

const Title  = styled.span<{completed: boolean}>`
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
    margin-left: 8px;
    max-width: 500px;
`;

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, favorite, toggleComplete, toggleFavorite, deleteTask }) => {
    const [loading, setLoading] = useState(false);

    const handleToggleComplete = async () => {
        setLoading(true);
        try {
            await toggleComplete(id);
        } catch (error) {
            console.error("Error toggling complete:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleFavorite = async () => {
        setLoading(true);
        try {
            await toggleFavorite(id);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async () => {
        setLoading(true);
        try {
            await deleteTask(id);
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <TaskContainer>
            <TaskContent>
                <Checkbox
                    checked={completed}
                    onChange={handleToggleComplete}
                    disabled={loading}/>
                <Title completed={completed}>{title}</Title>
            </TaskContent>
            <div>
                <IconButton onClick={handleToggleFavorite} disabled={loading}>
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : favorite ? (
                        <StarIcon color="primary" />
                    ) : (
                        <StarBorderIcon />
                    )}
                </IconButton>
                <IconButton onClick={handleDeleteTask} disabled={loading}>
                    {loading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <DeleteIcon color="error" />
                    )}
                </IconButton>
            </div>
        </TaskContainer>
    );
};

export default TaskItem;
