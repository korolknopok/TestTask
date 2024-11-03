import React from 'react';
import { Box } from '@mui/material';
import AddTask from './AddTask';
import TaskFilter from './TaskFilter';

const TaskManager: React.FC = () => {
    return(
        <Box display="flex" flexDirection="row" sx = {{my : 2, alignItems: 'center'}}>
            <AddTask/>
            <TaskFilter/>
        </Box>
    )
}
export default TaskManager;
