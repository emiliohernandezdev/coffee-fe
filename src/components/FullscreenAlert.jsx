import { Backdrop, Box, Typography } from "@mui/material";

const FullScreenAlert = ({ open, message }) => {
    return (
        <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: "#fff" }}>
            <Box
                sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    padding: "40px",
                    borderRadius: "16px",
                    textAlign: "center",
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
                }}
            >
                <Typography variant="h4" fontWeight="bold" mb={2}>
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
};

export default FullScreenAlert;
