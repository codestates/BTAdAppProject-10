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
import { HelpCenter, Launch } from '@mui/icons-material';
import { copyTextToClipboard, shortenAddress } from '../utils';
import { useContractRead } from 'wagmi';
import { networks, abi } from '../contracts/Lottery.json';
import { useMemo } from 'react';
import { useEffect } from 'react';

export default function BasicTable(props) {
    const { round, maxRound } = props;
    const isLatest = useMemo(() => round === maxRound, [round, maxRound]);

    const { data: winnerByLottery } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getWinnerByLottery',
        enabled: !isLatest,
        args: [round]
    });

    const { data: currentNumberOfPlayers } = useContractRead({
        address: networks[5777].address,
        abi,
        functionName: 'getCurrentNumberOfPlayers',
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
        console.log({ amountByLottery });
    }, [amountByLottery])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>회차</TableCell>
                        <TableCell align="center">상태</TableCell>
                        <TableCell align="center">우승자</TableCell>
                        <TableCell align="center">참가 인원</TableCell>
                        <TableCell align="center">txId</TableCell>
                        <TableCell align="center">상세 정보</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center" component="th" scope="row">
                            {`${round}${isLatest ? '(최근)' : ''}`}
                        </TableCell>
                        <TableCell align="center">{`${isLatest ? '진행중' : '완료'}`}</TableCell>
                        <TableCell align="center">
                            <Tooltip title={winnerByLottery}>
                                <Button
                                    sx={{ textTransform: 'none' }}
                                    onClick={() => copyTextToClipboard(winnerByLottery)}
                                >
                                    {`${isLatest ? '-' : shortenAddress(winnerByLottery)}`}
                                </Button>
                            </Tooltip>
                        </TableCell>
                        <TableCell align="center">{isLatest ? currentNumberOfPlayers : maxNumberOfPlayers}</TableCell>
                        <TableCell align="center">
                            <Tooltip title="etherscan으로 이동합니다.">
                                <IconButton>
                                    <Launch />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        <TableCell align="center">
                            <IconButton >
                                <HelpCenter />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
