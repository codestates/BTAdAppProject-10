import {useAccount, useBalance, useConnect, useDisconnect, useEnsName} from 'wagmi'
import {InjectedConnector} from 'wagmi/connectors/injected'
import {Box, Button} from "@mui/material";
import {fromWei} from 'web3-utils';

export default function Profile() {
    const {address, isConnected} = useAccount();
    const {data, isError, isLoading} = useBalance({
        addressOrName: address,
        formatUnits: 'ether'
    });
    const {data: ensName} = useEnsName({address})
    const {connect} = useConnect({
        connector: new InjectedConnector(),
    });
    const {disconnect} = useDisconnect();

    if (isConnected) return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box>Connected to {ensName ?? address}</Box>
            <Box>
                잔액: {(isLoading || isError) ? 'balance load error' : `${fromWei(data.value.toString(), 'ether')} ${data.symbol}`}
            </Box>
            <Box>
                <Button variant="contained" color="error" onClick={disconnect}>disconnet</Button>
            </Box>
        </Box>
    )
    return <Button variant="outlined" onClick={() => connect()}>Connect Wallet</Button>
}
