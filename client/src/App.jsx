import {EthProvider} from "./contexts/EthContext";
import {BrowserRouter} from "react-router-dom";
import "./App.css";
import Routes from './Routes';
function App() {
  return (
      <EthProvider>
        <BrowserRouter>
         <Routes />
        </BrowserRouter>
      </EthProvider>
  );
}

export default App;
