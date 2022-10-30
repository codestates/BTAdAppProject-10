import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import { Launch } from '@mui/icons-material';
import { copyTextToClipboard, shortenAddress } from '../utils';
import { useContractRead } from 'wagmi';
import { networks, abi } from '../contracts/Lottery.json';
import { useEffect } from 'react';

import web3 from 'web3';

export default function BasicTable(props) {
    const { round, maxRound } = props;

    const { data: winnerByLottery } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getWinnerByLottery',
        args: [round]
    });

    const { data: rewardAmountByLottery } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getAmountByLottery',
        args: [round]
    });

    const { data: currentNumberOfPlayers } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getCurrentNumberOfPlayers',
    });

    const { data: winnerIdByLottery } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getIDByLottery',
        args: [round]
    });


    const { data: maxNumberOfPlayers } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getMaxNumberOfPlayers',
    });

    const { data: players } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getPlayers',
    });

    const { data: amountByLottery } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getAmountByLottery',
        args: [round],
    });

    useEffect(() => {
        console.log({ rewardAmountByLottery });
    }, [rewardAmountByLottery])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">회차</TableCell>
                        <TableCell align="center">상태</TableCell>
                        <TableCell align="center">우승자 ID</TableCell>
                        <TableCell align="center">우승자 지갑 주소</TableCell>
                        <TableCell align="center">참가 인원</TableCell>
                        <TableCell align="center">총 상금</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center" component="th" scope="row">
                            {round}
                        </TableCell>
                        <TableCell align="center">완료</TableCell>
                        <TableCell align="center">
                            <Tooltip title={winnerIdByLottery}>
                                <Button
                                    sx={{ textTransform: 'none' }}
                                    onClick={() => copyTextToClipboard(winnerIdByLottery)}
                                >
                                    {winnerIdByLottery}
                                </Button>
                            </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                            <Tooltip title={winnerByLottery}>
                                <Button
                                    sx={{ textTransform: 'none' }}
                                    onClick={() => copyTextToClipboard(winnerByLottery)}
                                >
                                    {shortenAddress(winnerByLottery)}
                                </Button>
                            </Tooltip>
                        </TableCell>
                        <TableCell align="center">{maxNumberOfPlayers}</TableCell>
                        <TableCell align="center">
                            {`${web3.utils.fromWei(rewardAmountByLottery?.toString() || '0', 'ether')} ETH`}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
