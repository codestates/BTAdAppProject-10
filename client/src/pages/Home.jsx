import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DefaultLayout } from "../layouts";

const useParticipationCount = () => {
    return {
        limit: 10,
        current: 3,
    }
};

const useEntryPrice = () => {
    return 0.05;
};

const Home = () => {
    const { limit, current } = useParticipationCount();
    const entryprice = useEntryPrice();
    const navigate = useNavigate();
    const unit = 'ETH';

    return (
        <DefaultLayout>
            <Box sx={{ textAlign: 'center' }} mt={10}>
                <Typography variant="h2">현재 인원</Typography>
                <Typography variant="h4">{`${current} / ${limit}`}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }} mt={5}>
                <Typography variant="h2">참가 비용</Typography>
                <Typography variant="h4">{`${entryprice} ${unit}`}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }} mt={2}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        navigate('/participate');
                    }}
                >
                    참가하기
                </Button>
            </Box>
        </DefaultLayout>
    );
};

export default Home;
