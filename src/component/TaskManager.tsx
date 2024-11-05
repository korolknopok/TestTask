import React from 'react';
import { Box } from '@mui/material';
import AddTask from './AddTask';
import TaskFilter from './TaskFilter';

const styles = {my : 2, alignItems: 'center'};

const TaskManager: React.FC = () => {
    return(
        <Box display="flex" flexDirection="row" sx = {styles}>
            <AddTask/>
            <TaskFilter/>
        </Box>
    )
}
export default TaskManager;
