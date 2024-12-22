import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // Replace '/' with your home route
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                padding: 3,
            }}
        >
            <img 
                src="see-the-future.png" 
                alt="404 - Page Not Found" 
                style={{ 
                    maxWidth: '100%', 
                    height: 'auto', 
                    marginBottom: '1rem' 
                }} 
            />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2, color: '#555' }}>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Button 
                variant="contained" 
                sx={{ 
                    backgroundColor: '#00cfc1', 
                    color: '#fff', 
                    '&:hover': { backgroundColor: '#00b3a0' } 
                }}
                onClick={handleGoHome}
            >
                Back to Home
            </Button>
        </Box>
    );
};

export default Error;
