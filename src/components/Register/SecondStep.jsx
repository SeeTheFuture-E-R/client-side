import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

function SecondStep({ formData = {}, setFormData, handleNext, handleBack }) {
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    birth_year: '',
    family_status: '',
    num_of_children: '',
    handicap_precentage: ''
  });

  const familyStatusOptions = [
    { value: 'single', label: 'רווק/ה' },
    { value: 'married', label: 'נשוי/אה' },
    { value: 'divorced', label: 'גרוש/ה' },
    { value: 'widowed', label: 'אלמן/ה' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName) {
      newErrors.firstName = 'נדרש שם פרטי';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'נדרש שם משפחה';
    }

    if (formData.phone && !/^05\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    if (!formData.birth_year) {
      newErrors.birth_year = 'נדרשת שנת לידה';
    } else if (formData.birth_year < 1900 || formData.birth_year > new Date().getFullYear()) {
      newErrors.birth_year = 'שנת לידה לא תקינה';
    }

    if (!formData.family_status) {
      newErrors.family_status = 'נדרש מצב משפחתי';
    }

    if (formData.num_of_children < 0) {
      newErrors.num_of_children = 'מספר ילדים לא תקין';
    }

    if (formData.handicap_precentage < 0 || formData.handicap_precentage > 100) {
      newErrors.handicap_precentage = 'אחוז נכות לא תקין';
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

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // Add form ref to access validation from parent
  const formRef = React.useRef();

  React.useEffect(() => {
    // Expose validate function to the form element
    if (formRef.current) {
      formRef.current.checkValidity = validateForm;
    }
  }, [formRef]);

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <FormControl fullWidth>
        <Typography variant="h6" gutterBottom align="center">
          פרטים אישיים
        </Typography>
        
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="שם פרטי"
              fullWidth
              variant="outlined"
              value={formData.firstName || ''}
              onChange={handleChange('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName}
              dir="rtl"
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="שם משפחה"
              fullWidth
              variant="outlined"
              value={formData.lastName || ''}
              onChange={handleChange('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName}
              dir="rtl"
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              id="phone"
              name="phone"
              label="מספר טלפון"
              fullWidth
              variant="outlined"
              value={formData.phone || ''}
              onChange={handleChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
              dir="rtl"
            />
          </Grid>
          <br/>
          <Grid container spacing={2}>
          <Grid item xs={5} >
            <TextField
              required
              id="birth_year"
              name="birth_year"
              label="שנת לידה"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.birth_year || ''}
              onChange={handleChange('birth_year')}
              error={!!errors.birth_year}
              helperText={errors.birth_year}
              dir="rtl"
              InputProps={{ inputProps: { min: 1900, max: new Date().getFullYear() } }}
            />
          </Grid>

        <Grid item xs={5}>  {/* First TextField takes 6/12 = 50% */}
            <TextField
                required
                select
                id="family_status"
                name="family_status"
                label="מצב משפחתי"
                fullWidth
                variant="outlined"
                value={formData.family_status || ''}
                onChange={handleChange('family_status')}
                error={!!errors.family_status}
                helperText={errors.family_status}
                dir="rtl"
            >
                {familyStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>

        <Grid item xs={5}>  {/* Second TextField takes 6/12 = 50% */}
            <TextField
                id="num_of_children"
                name="num_of_children"
                label="מספר ילדים"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.num_of_children || 0}
                onChange={handleChange('num_of_children')}
                error={!!errors.num_of_children}
                helperText={errors.num_of_children}
                dir="rtl"
                InputProps={{ inputProps: { min: 0 } }}
            />
        </Grid>
        

          <Grid item xs={5} >
            <TextField
              id="handicap_precentage"
              name="handicap_precentage"
              label="אחוז נכות"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.handicap_precentage || 0}
              onChange={handleChange('handicap_precentage')}
              error={!!errors.handicap_precentage}
              helperText={errors.handicap_precentage}
              dir="rtl"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
            />
          </Grid></Grid>
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
            הבא
          </Button>
        </Box>
      </FormControl>
    </form>
  );
}

export default SecondStep;
