import React from "react";
import {Container, createTheme, Typography, ThemeProvider} from "@mui/material";
import TaskList from "./component/TaskList";

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
                <TaskList/>
            </Container>
        </ThemeProvider>
    )
}

export default App;