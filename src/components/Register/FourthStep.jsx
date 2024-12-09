import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useState } from 'react';

function FourthStep({ formData = {}, setFormData, handleNext, handleBack }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!verificationCode) {
      setError('נדרש קוד אימות');
      return false;
    }
    // Add verification code validation logic here
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleNext();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <FormControl fullWidth>
        <Typography variant="h6" gutterBottom align="center">
          אימות כתובת מייל
        </Typography>
        
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} sm={8}>
            <Typography variant="body1" gutterBottom align="center">
              קוד אימות נשלח לכתובת המייל שלך
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="verificationCode"
              name="verificationCode"
              label="קוד אימות"
              fullWidth
              variant="outlined"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              error={!!error}
              helperText={error}
              dir="rtl"
            />
          </Grid>
        </Grid>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 4,
          borderTop: 1,
          borderColor: 'divider',
          pt: 2
        }}>
          <Button 
            onClick={handleBack}
            variant="outlined"
            sx={{ 
              minWidth: '100px',
              color: 'primary.main',
              borderColor: 'primary.main'
            }}
          >
            הקודם
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ 
              minWidth: '200px',
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            סיום
          </Button>
        </Box>
      </FormControl>
    </form>
  );
}

export default FourthStep;


