import { useMemo } from 'react';
import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';


export default function Select(props) {
    const { round, onChange, maxRound } = props;

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    const lotteryIdArray = useMemo(() => {
        return Array.from({ length: maxRound }).map((_, idx) => idx + 1).reverse();
    }, [maxRound]);

    return (
        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
            <InputLabel id="demo-select-small">회차</InputLabel>
            <MuiSelect
                labelId="demo-select-small"
                id="demo-select-small"
                value={round}
                label="회차 선택"
                onChange={handleChange}
            >
                {lotteryIdArray.map((id, idx) => <MenuItem key={id} value={id}>{`${id}회차`}</MenuItem>)}
            </MuiSelect>
        </FormControl>
    );
};
