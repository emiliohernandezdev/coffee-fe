import { Fab } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';

const OrderButton = () => {

    return (
        <Fab variant="extended">
            <NavigationIcon sx={{ mr: 1 }} />
            Navigate
        </Fab>
    );
}

export default OrderButton;
