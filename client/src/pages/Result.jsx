import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DefaultLayout } from "../layouts";
import ResultTable from '../components/ResultTable';
import Select from '../components/Select';
import { networks, abi } from '../contracts/Lottery.json';
import { useContractRead } from 'wagmi';

const Result = () => {
    const { data: latestPreviousRound = 1 } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getCurrentRound',
    });

    const [maxRound, setMaxRound] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);

    useEffect(() => {
        setMaxRound(latestPreviousRound - 1);
    }, [latestPreviousRound]);

    useEffect(() => {
        setCurrentRound(maxRound);
    }, [maxRound]);


    return (
        <DefaultLayout>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>
                {maxRound === 0 ? (
                    <>
                        <Typography variant="h4">과거 배팅 히스토리가 없습니다.</Typography>
                    </>
                ) : (
                    <>
                        <Select
                            maxRound={Number(maxRound)}
                            round={Number(currentRound)}
                            onChange={(round) => { setCurrentRound(round) }}
                        />
                        <ResultTable maxRound={Number(maxRound)} round={Number(currentRound)} />
                    </>
                )}

            </Box>
        </DefaultLayout >
    );
};

export default Result;
