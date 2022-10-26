import {Box, Button} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

const pages = [
    {
        name: 'home',
        link: '/home'
    },
    {
        name: 'participate',
        link: '/participate'
    },
    {
        name: 'result',
        link: '/result'
    },
    {
        name: 'other',
        link: '/other'
    },
];

const DefaultLayout = (props) => {
    const {children} = props;
    const navigate = useNavigate()
    const {pathname} = useLocation()

    return (
        <Box p={2} display="flex" flexDirection="column" alignItems="center" gap={5} >
            <Box display="flex" gap={0.5}>
                {pages.map((page) => (
                    <Button
                        variant={pathname === page.link ? 'contained' : 'outlined'}
                        key={page.link}
                        onClick={() => {
                            navigate(page.link);
                        }}
                    >
                        {page.name}
                    </Button>
                ))}
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    )
};

export default DefaultLayout;
