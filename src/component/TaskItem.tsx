import React from 'react';
import { createTheme, ThemeProvider, Checkbox, IconButton } from '@mui/material';
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

const theme = createTheme({
    palette: {
        primary: {
            main: '#7a36d0',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    }
});

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

const Title  = styled.span<{completed : boolean}>`
    text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
    margin-left: 8px;
    max-width: 500px ;
`;

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, favorite, toggleComplete, toggleFavorite, deleteTask }) => {
    return (
        <ThemeProvider theme={theme}>
            <TaskContainer>
                <TaskContent>
                    <Checkbox checked={completed} onChange={() => toggleComplete(id)}/>
                    <Title completed={completed} >{title}</Title>
                </TaskContent>
                <div>
                    <IconButton onClick={() => toggleFavorite(id)}>
                        {favorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
                    </IconButton>
                    <IconButton onClick={() => deleteTask(id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </div>
            </TaskContainer>
        </ThemeProvider>
    );
};

export default TaskItem;
