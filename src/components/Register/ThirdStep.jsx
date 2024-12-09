import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useState } from 'react';
import MyUploadFile from './UploadFile';

function ThirdStep({ formData = {}, setFormData, handleNext, handleBack }) {
  const [errors, setErrors] = useState({
    identity_card: '',
    handicap_card: '',
    blind_card: ''
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.identity_card) {
      newErrors.identity_card = 'נדרש להעלות תעודת זהות';
    }

    if (!formData.handicap_card) {
      newErrors.handicap_card = 'נדרש להעלות תעודת נכה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
          העלאת מסמכים
        </Typography>
        
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} sm={8}>
            <MyUploadFile
              label="תעודת זהות"
              file={formData.identity_card}
              setFile={(file) => setFormData(prev => ({ ...prev, identity_card: file }))}
              error={errors.identity_card}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <MyUploadFile
              label="תעודת נכה"
              file={formData.handicap_card}
              setFile={(file) => setFormData(prev => ({ ...prev, handicap_card: file }))}
              error={errors.handicap_card}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <MyUploadFile
              label="תעודת עיוור"
              file={formData.blind_card}
              setFile={(file) => setFormData(prev => ({ ...prev, blind_card: file }))}
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
            sx={{ mr: 1 }}
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
            הבא
          </Button>
        </Box>
      </FormControl>
    </form>
  );
}

export default ThirdStep;


