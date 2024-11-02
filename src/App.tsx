import React from "react";
import {Container, Typography} from "@mui/material";
import TaskList from "./component/TaskList";

const App : React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" align = "center" gutterBottom>
                Todo List
            </Typography>
            <TaskList/>
        </Container>
    )
}

export default App;