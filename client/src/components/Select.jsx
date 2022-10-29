import { useState, useMemo } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';

export default function Select(props) {
    const { currentLotteryId = 3 } = props;
    const [age, setAge] = useState(currentLotteryId);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const lotteryIdArray = useMemo(() => {
        return Array.from({ length: currentLotteryId }).map((_, idx) => idx + 1).reverse();
        // return [currentLotteryId].map((_, idx) => idx + 1).reverse();
    }, [currentLotteryId]);

    return (
        <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
            <InputLabel id="demo-select-small">회차</InputLabel>
            <MuiSelect
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="회차 선택"
                onChange={handleChange}
            >
                {lotteryIdArray.map((id, idx) => {
                    return (
                        <MenuItem key={id} value={id}>{`${id}회차${idx === 0 ? '(최근)' : ''}`}</MenuItem>
                    )
                })}
            </MuiSelect>
        </FormControl>
    );
}