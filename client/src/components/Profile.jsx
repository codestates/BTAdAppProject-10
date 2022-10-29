import { useAccount, useBalance, useEnsName } from 'wagmi'
import { Box } from "@mui/material";
import { fromWei } from 'web3-utils';

export default function Profile() {
    const { address, isConnected } = useAccount();
    const { data, isError, isLoading } = useBalance({
        addressOrName: address,
        formatUnits: 'ether'
    });
    const { data: ensName } = useEnsName({ address })

    return isConnected ? (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box>Connected to {ensName ?? address}</Box>
            <Box>
                잔액: {(isLoading || isError) ? 'balance load error' : `${fromWei(data.value.toString(), 'ether')} ${data.symbol}`}
            </Box>
        </Box>
    ) : (
        null
    );
};
