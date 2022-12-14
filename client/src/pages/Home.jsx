import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { DefaultLayout } from "../layouts";
import Dialog from "../components/Dialog";
import { networks, abi } from '../contracts/Lottery.json';
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { useEffect } from "react";
import RedirectDialog from "../components/RedirectDialog";
import { useNavigate } from "react-router-dom";

const useEntryPrice = () => '0.01';

const Home = () => {
    const entryprice = useEntryPrice();
    const unit = 'ETH';

    const [open, setOpen] = useState(false);
    const [openRedirectDialog, setOpenRedirectDialog] = useState(false);
    const [players, setPlayers] = useState([]);
    const [userId, setUserId] = useState('');
    const { address } = useAccount();
    const navigate = useNavigate();

    const { writeAsync: enter } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: networks[5777].address,
        abi,
        functionName: 'enter',
        enabled: false,
        overrides: {
            value: ethers.utils.parseEther(entryprice)
        },
        args: [userId || address],
        onSuccess: () => {
            getCurrentNumberOfPlayers();
            getPlayers();
            getCurrentRound();
            setOpenRedirectDialog(true);
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
                    ????????? ???????????? ?????? ?????????!
                </Typography>
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap">
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">?????? ??????</Typography>
                    <Typography fontWeight={200} variant="h4">{Number(currentRound)}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">?????? ??????</Typography>
                    <Typography fontWeight={200} variant="h4">{`${currentNumberOfPlayers} / ${maxNumberOfPlayers}`}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">?????? ??????</Typography>
                    <Typography fontWeight={200} variant="h4">{`${entryprice} ${unit}`}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">??? ??????</Typography>
                    <Typography fontWeight={200} variant="h4">{`${currentNumberOfPlayers * entryprice} ETH`}</Typography>
                </Box>
            </Box>
            {players.includes(address) ? (
                <Box sx={{ textAlign: 'center' }} mt={2}>
                    <Button variant="outlined" disabled>?????? ??????! ????????? ????????? ?????????.</Button>
                </Box>
            ) : (
                <Box sx={{ textAlign: 'center' }} mt={2}>
                    <Button
                        variant="outlined"
                        disabled={!address}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        {Boolean(address) ? '????????????' : '????????? ????????? ?????????'}
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
              <RedirectDialog
                open={openRedirectDialog}
                onClose={() => setOpenRedirectDialog(false)}
                onConfirm={() => navigate('result')}
            />
        </DefaultLayout>
    );
};

export default Home;
