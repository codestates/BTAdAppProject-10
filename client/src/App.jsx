import {EthProvider} from "./contexts/EthContext";
import {BrowserRouter} from "react-router-dom";
import "./App.css";
import Routes from './Routes';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

function App() {
    const theme = createTheme({});

    return (
        <EthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ThemeProvider>
        </EthProvider>
    );
}

export default App;
