import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { DefaultLayout } from "../layouts";
import Dialog from "../components/Dialog";
import { networks, abi } from '../contracts/Lottery.json';
import { useContractWrite } from "wagmi";
import { ethers } from "ethers";

const useParticipationCount = () => {
    return {
        limit: 10,
        current: 3,
    }
};

const useEntryPrice = () => {
    return '0.01';
};

const Home = () => {
    const { limit, current } = useParticipationCount();
    const entryprice = useEntryPrice();
    const unit = 'ETH';
    const [open, setOpen] = useState(false);

    const { writeAsync: enter } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: networks[5777].address,
        abi,
        functionName: 'enter',
        enabled: false,
        overrides: {
            value: ethers.utils.parseEther(entryprice)
        }
    });

    return (
        <DefaultLayout>
            <Box sx={{ textAlign: 'center' }} my={4}>
                <Typography fontWeight={200} variant="h2">
                    상금의 주인공이 되어 보세요!
                </Typography>
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap">
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">현재 인원</Typography>
                    <Typography fontWeight={200} variant="h4">{`${current} / ${limit}`}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">참가 비용</Typography>
                    <Typography fontWeight={200} variant="h4">{`${entryprice} ${unit}`}</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', border: '1px solid #ababab', borderRadius: 4, p: 4 }}>
                    <Typography fontWeight={200} variant="h3">총 금액</Typography>
                    <Typography fontWeight={200} variant="h4">xxx ETH</Typography>
                </Box>
            </Box>
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
            <Box sx={{ textAlign: 'center' }} mt={2}>
                <Button variant="outlined" disabled>참여 완료! 결과를 기다려 주세요.</Button>
            </Box>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={async () => enter()}
            />
        </DefaultLayout>
    );
};

export default Home;
