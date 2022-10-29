import { Box } from "@mui/material";
import Header from '../components/Header';

const DefaultLayout = (props) => {
    const { children } = props;

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100%"
        >
            <Header />
            <Box
                flex={1}
                px={2}
                py={4}
                sx={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    // backgroundImage: 'url("dice-img_1920.jpg")',
                    // backgroundSize: '100% auto',
                    // backgroundRepeatY: 'no-repeat',
                }}
            >
                <div>
                    {children}
                </div>
            </Box>
        </Box>
    )
};

export default DefaultLayout;
