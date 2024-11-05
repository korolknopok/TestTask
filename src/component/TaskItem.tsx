import React, {useCallback, useState} from 'react';
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

const Title = styled.span<{ completed: boolean }>`
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
    margin-left: 8px;
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, favorite, toggleComplete, toggleFavorite, deleteTask }) => {
    const [loadingFavorite, setLoadingFavorite] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);

    const handleToggleComplete = useCallback(async () => {
        setLoadingComplete(true);
        try {
            await toggleComplete(id);
        } catch (error) {
            console.error("Error toggling complete:", error);
        } finally {
            setLoadingComplete(false);
        }
    }, [id, toggleComplete]);

    const handleToggleFavorite = useCallback(async () => {
        setLoadingFavorite(true);
        try {
            await toggleFavorite(id);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        } finally {
            setLoadingFavorite(false);
        }
    }, [id, toggleFavorite]);

    const handleDeleteTask = useCallback(async () => {
        setLoadingDelete(true);
        try {
            await deleteTask(id);
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setLoadingDelete(false);
        }
    }, [id, deleteTask]);

    return (
        <TaskContainer>
            <TaskContent>
                <Checkbox
                    checked={completed}
                    onChange={handleToggleComplete}/>
                <Title completed={completed}>{title}</Title>
            </TaskContent>
            <div>
                <IconButton onClick={handleToggleFavorite} disabled={loadingFavorite}>
                    {loadingFavorite ? (
                        <CircularProgress size={24} />
                    ) : favorite ? (
                        <StarIcon color="primary" />
                    ) : (
                        <StarBorderIcon />
                    )}
                </IconButton>
                <IconButton onClick={handleDeleteTask} disabled={loadingDelete}>
                    {loadingDelete ? (
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
