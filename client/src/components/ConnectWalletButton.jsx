import { useAccount, useConnect, useDisconnect} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button } from "@mui/material";

const ConnectWalletButton = () => {
    const { isConnected } = useAccount();
    const { connect } = useConnect({ connector: new InjectedConnector() });
    const { disconnect } = useDisconnect();

    return isConnected ? (
        <Button variant="contained" color="error" onClick={disconnect}>disconnet</Button>
    ) : (
        <Button variant="contained" onClick={() => connect()}>Connect Wallet</Button>
    );
}

export default ConnectWalletButton;