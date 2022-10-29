import {Box } from '@mui/material';
import { DefaultLayout } from "../layouts";
import ResultTable from '../components/ResultTable';
import Select from '../components/Select';

const Result = () => {
    return (
        <DefaultLayout>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>
                <Select />
                <ResultTable />
            </Box>
        </DefaultLayout>
    );
};

export default Result;
