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

function createData(count, status, winner, peopleCount, txId) {
    return { count, status, winner, peopleCount, txId };
}

const rows = [
    createData(3, '진행중', '0xED98220A5f4215521FA0451B85b8Aa0d192C5c06', 10, 24, 4.0),
    // createData(2, '완료', '0x5b8AED98220A5f4FA0451B8215521a0d192C5c06', 10, 24, 4.0),
    // createData(1, '완료', '85b8AED98220A5f4215521a0d190xFA0451B2C5c06', 10, 24, 4.0),
];

export default function BasicTable() {
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
                    {rows.map((row, _, { length }) => (
                        <TableRow
                            key={row.count}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {`${row.count}${row.count === length ? '(최근)' : ''}`}
                            </TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">
                                <Tooltip title={row.winner}>
                                    <Button sx={{textTransform: 'none'}} onClick={() => copyTextToClipboard(row.winner)}>
                                        {shortenAddress(row.winner)}
                                    </Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell align="center">{row.peopleCount}</TableCell>
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
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}