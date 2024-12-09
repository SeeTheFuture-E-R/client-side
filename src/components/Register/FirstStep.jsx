import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useState, useRef } from 'react';

function FirstStep({ formData = {}, setFormData, handleNext }) {
  const formRef = useRef();
  const [errors, setErrors] = useState({
    userId: '',
    email: '',
    password: '',
    verifyPassword: ''
  });
  const [verifyPassword, setVerifyPassword] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    // ID validation
    if (!formData.userId) {
      newErrors.userId = 'נדרש מספר זהות';
    } else if (!/^\d{9}$/.test(formData.userId)) {
      newErrors.userId = 'מספר זהות חייב להכיל 9 ספרות';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'נדרשת כתובת אימייל';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'נדרשת סיסמה';
    } else if (formData.password.length < 6) {
      newErrors.password = 'הסיסמה חייבת להכיל לפחות 6 תווים';
    }

    // Verify password
    if (!verifyPassword) {
      newErrors.verifyPassword = 'נדרש אימות סיסמה';
    } else if (formData.password !== verifyPassword) {
      newErrors.verifyPassword = 'הסיסמאות אינן תואמות';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  React.useEffect(() => {
    if (formRef.current) {
      formRef.current.checkValidity = validateForm;
    }
  }, [formRef]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleNext();
    }
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <FormControl fullWidth>
        <Typography variant="h6" gutterBottom align="center">
          רישום למערכת
        </Typography>
        
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="userId"
              name="userId"
              label="מספר זהות"
              fullWidth
              variant="outlined"
              value={formData.userId || ''}
              onChange={handleChange('userId')}
              error={!!errors.userId}
              helperText={errors.userId}
              dir="rtl"
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="email"
              name="email"
              label="כתובת מייל"
              fullWidth
              variant="outlined"
              value={formData.email || ''}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              dir="rtl"
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="password"
              name="password"
              label="סיסמא"
              type="password"
              fullWidth
              variant="outlined"
              value={formData.password || ''}
              onChange={handleChange('password')}
              error={!!errors.password}
              helperText={errors.password}
              dir="rtl"
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="verifyPassword"
              name="verifyPassword"
              label="אימות סיסמא"
              type="password"
              fullWidth
              variant="outlined"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              error={!!errors.verifyPassword}
              helperText={errors.verifyPassword}
              dir="rtl"
            />
          </Grid>
        </Grid>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mt: 4,
          borderTop: 1,
          borderColor: 'divider',
          pt: 2
        }}>
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

export default FirstStep;

