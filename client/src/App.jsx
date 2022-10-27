import {BrowserRouter} from "react-router-dom";
import "./App.css";
import Routes from './Routes';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {configureChains, chain, createClient, WagmiConfig} from 'wagmi'
import {publicProvider} from 'wagmi/providers/public'

// Ganache test chain
const RPC_SERVER_ADDRESS = 'http://127.0.0.1:7545';

function App() {
    const theme = createTheme({});
    const {provider, webSocketProvider} = configureChains(
        [{
            ...chain.localhost,
            rpcUrls: {default: RPC_SERVER_ADDRESS}
        }],
        [publicProvider()],
    )
    const client = createClient({
        autoConnect: true,
        provider,
        webSocketProvider,
    })

    return (
        <WagmiConfig client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </ThemeProvider>
        </WagmiConfig>
    );
}

export default App;
