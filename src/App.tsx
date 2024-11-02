import React from "react";
import {Container, Typography} from "@mui/material";
import TaskList from "./component/TaskList";

const App : React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" align = "center" fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif'>
                TODO LIST
            </Typography>
            <TaskList/>
        </Container>
    )
}

export default App;