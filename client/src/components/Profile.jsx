import {useAccount, useBalance, useConnect, useDisconnect, useEnsName} from 'wagmi'
import {InjectedConnector} from 'wagmi/connectors/injected'
import {Box, Button} from "@mui/material";
import {fromWei} from 'web3-utils';

export default function Profile() {
    const {address, isConnected} = useAccount()
    const {data, isError, isLoading} = useBalance({
        addressOrName: address,
        formatUnits: 'ether'
    })
    const {data: ensName} = useEnsName({address})
    const {connect} = useConnect({
        connector: new InjectedConnector(),
    })
    const {disconnect} = useDisconnect()

    console.log(data);
    if (isConnected) return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box>Connected to {ensName ?? address}</Box>
            <Box>
                {(isLoading || isError) ? '' : `${fromWei(data.value.toString(), 'ether')} ${data.symbol}`}
            </Box>
            <Box>
                <Button onClick={disconnect}>disconnet</Button>
            </Box>
        </Box>
    )
    return <Button onClick={() => connect()}>Connect Wallet</Button>
}
