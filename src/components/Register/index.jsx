import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import { useContext, useState } from "react";
import { AuthContext } from '../context/authContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const steps = ['רישום למערכת', 'פרטים אישיים', 'העלאת מסמכים', 'אימות כתובת מייל'];

function Register() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    phone: "",
    email: "",
    birth_year: null,
    family_status: "",
    num_of_children: 0,
    password: "",
    handicap_precentage: 0,
    blind_card: "A",
    handicap_card: "A",
    identity_card: "A"
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:9660/auth/register", formData);
      console.log(res);
      return res;
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  const upload = async () => {
    const formDataFiles = new FormData();
    
    // Add each file with a unique field identifier
    if (formData.identity_card) {
        formDataFiles.append('file', formData.identity_card, 'identity_card');
    }
    if (formData.blind_card) {
        formDataFiles.append('file', formData.blind_card, 'blind_card');
    }
    if (formData.handicap_card) {
        formDataFiles.append('file', formData.handicap_card, 'handicap_card');
    }

    try {
        const res = await axios.post(
            `http://localhost:9660/upload/${formData.userId}`, 
            formDataFiles, 
            { 
                headers: { 
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        console.log('Upload response:', res.data);
    } catch (err) {
        console.error("File upload error:", err);
    }
};

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const finishRegistration = async () => {
    try {
      await register();
      await upload();
      navigate('/login');
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (show error message to user)
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FirstStep 
        formData={formData} 
        setFormData={setFormData} 
        handleNext={handleNext}
      />;
      case 1:
        return <SecondStep 
          formData={formData} 
          setFormData={setFormData} 
          handleNext={handleNext}
          handleBack={handleBack}
        />;
      case 2:
        return <ThirdStep 
        formData={formData} 
        setFormData={setFormData} 
        handleNext={async()=>{await upload();}}
        handleBack={handleBack}
      />;
      case 3:
        return <FourthStep 
          formData={formData} 
          setFormData={setFormData} 
          handleNext={handleNext}
          handleBack={handleBack}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 3,
      minHeight: '100vh',
      bgcolor: '#f5f5f5'
    }}>
      <Card sx={{ 
        maxWidth: 800,
        width: '100%',
        mb: 4,
        boxShadow: 3,
        borderRadius: 2
      }}>
        <CardContent>
          <Typography 
            component="h1" 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ color: 'primary.main', mb: 4 }}
          >
            רישום
          </Typography>

          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              py: 3,
              '& .MuiStepLabel-label': {
                fontSize: '1rem',
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4, mb: 2 }}>
            {activeStep === steps.length ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  !הרישום הסתיים בהצלחה
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4 }}>
                  !תודה שהצטרפתם אלינו
                </Typography>
                {setTimeout(finishRegistration, 3000)}
              </Box>
            ) : (
              getStepContent(activeStep)
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;