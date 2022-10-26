import {EthProvider} from "./contexts/EthContext";
import {BrowserRouter} from "react-router-dom";
import "./App.css";
import Routes from './Routes';
import {ThemeProvider, createTheme} from '@mui/material/styles';

function App() {
    const theme = createTheme({});

    return (
        <EthProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ThemeProvider>
        </EthProvider>
    );
}

export default App;
