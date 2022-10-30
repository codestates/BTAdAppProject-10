import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DefaultLayout } from "../layouts";
import ResultTable from '../components/ResultTable';
import Select from '../components/Select';
import { networks, abi } from '../contracts/Lottery.json';
import { useContractRead } from 'wagmi';

const Result = () => {
    const { data: latestRound  = 1} = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getCurrentRound',
    });

    const [maxRound, setMaxRound] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);

    useEffect(() => {
        setMaxRound(latestRound);
    }, [latestRound]);

    useEffect(() => {
        setCurrentRound(maxRound > 0 ? maxRound - 1 : maxRound);
    }, [maxRound]);

    return (
        <DefaultLayout>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>
                <Select
                    maxRound={Number(maxRound)}
                    round={Number(currentRound)}
                    onChange={(round) => { setCurrentRound(round) }}
                />
                <ResultTable maxRound={Number(maxRound)} round={Number(currentRound)} />
            </Box>
        </DefaultLayout >
    );
};

export default Result;
