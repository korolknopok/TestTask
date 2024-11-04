import React from 'react';
import { SelectChangeEvent, Select, MenuItem} from '@mui/material';
import { useTaskStore } from '../store/taskStore';
import styled from 'styled-components';

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 15px 0;
    width: 180px;
    background-color: '#7a36d0';
`;

const TaskFilter: React.FC = () => {
    const { setFilter, currentFilter, fetchTasks } = useTaskStore();

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        const filter = event.target.value as string;
        setFilter(filter);
        fetchTasks();
    };

    return (
        <FilterContainer>
            <Select
                value={currentFilter}
                onChange={handleFilterChange}
                variant="outlined"
                displayEmpty
                fullWidth>
                <MenuItem value="all">Все</MenuItem>
                <MenuItem value="completed">Выполненные</MenuItem>
                <MenuItem value="incomplete">Не выполненные</MenuItem>
                <MenuItem value="favorite">Избранные</MenuItem>
            </Select>
        </FilterContainer>
    );
};

export default TaskFilter;
