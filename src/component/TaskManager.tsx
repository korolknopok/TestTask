import React from 'react';
import { Box } from '@mui/material';
import AddTask from './AddTask';
import TaskFilter from './TaskFilter';

const TaskManager: React.FC = () => {
    const styles = {my : 2, alignItems: 'center'};

    return(
        <Box display="flex" flexDirection="row" sx = {styles}>
            <AddTask/>
            <TaskFilter/>
        </Box>
    )
}
export default TaskManager;
