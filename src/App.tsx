import React from "react";
import {Container, createTheme, Typography, ThemeProvider} from "@mui/material";
import TaskList from "./component/TaskList";
import TaskManager from "./component/TaskManager";


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

const App : React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h4" align = "center" >
                    TODO LIST
                </Typography>
                <TaskManager />
                <TaskList/>
            </Container>
        </ThemeProvider>
    )
}

export default App;