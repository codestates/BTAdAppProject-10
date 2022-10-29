import { Box, Button } from "@mui/material";
import { useContractRead, useContractWrite, useSigner } from "wagmi";
import { DefaultLayout } from "../layouts";
import Profile from "../components/Profile";
import { networks, abi } from '../contracts/Lottery.json';
import { ethers } from "ethers";

const Other = () => {
    const { refetch } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getBalance',
        enabled: false,
    });

    const { writeAsync: enter } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: networks[5777].address,
        abi,
        functionName: 'enter',
        enabled: false,
        overrides: {
            value: ethers.utils.parseEther('0.011')
        }
    });
    const { data: signer} = useSigner();
    const { writeAsync: pickWinner } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: networks[5777].address,
        abi,
        functionName: 'pickWinner',
        enabled: false,
        signerOrProvider: signer,
    });

    const onClickBalanceCheck = async () => {
        const { data } = await refetch();
        console.log(signer);
        alert(`잔액: ${data}`);
    };

    const onClickSendEth = async () => {
        const result = await enter();

        alert(result);
    };

    const onClickPickWinner = async () => {
        await pickWinner();
    };

    return (
        <DefaultLayout>
            <Profile />
            <Box mt={2} display="flex" gap={1} justifyContent="center">
                <Button variant="contained" onClick={onClickBalanceCheck}>총 예치금 체크</Button>
                <Button variant="contained" onClick={onClickSendEth}>ETH 송금</Button>
                <Button variant="contained" color="success" onClick={onClickPickWinner}>승자 뽑기</Button>
            </Box>
        </DefaultLayout>
    );
};

export default Other;
