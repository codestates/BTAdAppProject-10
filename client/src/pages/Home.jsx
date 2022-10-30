import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { DefaultLayout } from "../layouts";
import Dialog from "../components/Dialog";
import { networks, abi } from '../contracts/Lottery.json';
import { useAccount, useContractEvent, useContractRead, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { useEffect } from "react";

const useEntryPrice = () => '0.01';

const Home = () => {
    const entryprice = useEntryPrice();

    const unit = 'ETH';
    const [open, setOpen] = useState(false);
    const [players, setPlayers] = useState([]);
    const [userId, setUserId] = useState('');

    const { address } = useAccount();

    // TODO: event test
    // useContractEvent({
    //     address: networks[5777].address,
    //     abi,
    //     eventName: 'Complete',
    //     listener: (a, b, c) => {
    //         const result = window.confirm('이동하시겠습니까?');
    //         console.log({a,b,c});
    //     },
    // })

    const { writeAsync: enter } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: networks[5777].address,
        abi,
        functionName: 'enter',
        enabled: false,
        overrides: {
            value: ethers.utils.parseEther(entryprice)
        },
        args: [userId ?? address],
        onSuccess: () => {
            getCurrentNumberOfPlayers();
            getPlayers();
            getCurrentRound();
        }
    });

    const { data: currentNumberOfPlayers, refetch: getCurrentNumberOfPlayers } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getCurrentNumberOfPlayers',
    });

    const { data: maxNumberOfPlayers } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getMaxNumberOfPlayers',
    });

    const { data: currentPlayers, refetch: getPlayers } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getPlayers',
    });

    const { data: currentRound, refetch: getCurrentRound } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getCurrentRound',
    });

    useEffect(() => {
        if (currentPlayers) {
            setPlayers(currentPlayers);
        }
    }, [currentPlayers]);

    return (
        <DefaultLayout>
            <Box sx={{ textAlign: 'center' }} my={4}>
                <Typography fontWeight={200} variant="h2">
                    상금의 주인공이 되어 보세요!
                </Typography>
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap">
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">현재 회차</Typography>
                    <Typography fontWeight={200} variant="h4">{Number(currentRound)}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">현재 인원</Typography>
                    <Typography fontWeight={200} variant="h4">{`${currentNumberOfPlayers} / ${maxNumberOfPlayers}`}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">참가 비용</Typography>
                    <Typography fontWeight={200} variant="h4">{`${entryprice} ${unit}`}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">총 금액</Typography>
                    <Typography fontWeight={200} variant="h4">{`${currentNumberOfPlayers * entryprice} ETH`}</Typography>
                </Box>
            </Box>
            {players.includes(address) ? (
                <Box sx={{ textAlign: 'center' }} mt={2}>
                    <Button variant="outlined" disabled>참여 완료! 결과를 기다려 주세요.</Button>
                </Box>
            ) : (
                <Box sx={{ textAlign: 'center' }} mt={2}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        참가하기
                    </Button>
                </Box>
            )}
            <Dialog
                open={open}
                userId={userId}
                onChangeUserId={(e) => setUserId(e.target.value)}
                onClose={() => setOpen(false)}
                onConfirm={async (id) => enter(id)}
            />
        </DefaultLayout>
    );
};

export default Home;
