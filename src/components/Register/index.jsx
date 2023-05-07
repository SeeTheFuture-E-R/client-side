import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import { useContext, useState } from "react";
import { AuthContext } from '../context/authContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyUploadFile from './UploadFile'
import PdfViewer from '../Viewer';

const steps = [' רישום למערכת', 'פרטים אישיים', 'העלאת מסמכים', 'אימות כתובת מייל'];


function Register() {

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:9660/auth/register", user
      )
      console.log(res);
    }
    catch (err) {
      console.log(err)
    }
  }

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userId, setUserId] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [birth_year, setBirth_year] = useState(null)
  const [family_status, setFamily_status] = useState("")
  const [num_of_children, setNum_of_children] = useState(0)
  const [password, setPassword] = useState("")
  const [blind_card, setBlind_card] = useState()
  const [handicap_card, setHandicap_card] = useState()
  const [identity_card, setIdentity_card] = useState()
  const [handicap_precentage, setHandicap_precentage] = useState(0);

  const [activeStep, setActiveStep] = useState(0)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    backgroundColor: 'white',
    padding: '2%'
  }


  const user = {
    userId: userId,
    password: password,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    birth_year: birth_year,
    // family_status: family_status,
    num_of_children: num_of_children,
    handicap_precentage: handicap_precentage,
  }




  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FirstStep
          userId={userId}
          email={email}
          password={password}
          handleNext={handleNext}
          setPassword={setPassword}
          setUserId={setUserId}
          setEmail={setEmail}
        />;
      case 1:
        return <SecondStep
          handleNext={handleNext}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          birth_year={birth_year}
          setBirth_year={setBirth_year}
          family_status={family_status}
          setFamily_status={setFamily_status}
          num_of_children={num_of_children}
          setNum_of_children={setNum_of_children}
          handicap_precentage={handicap_precentage}
          setHandicap_precentage={setHandicap_precentage}
          phone={phone}
          setPhone={setPhone}
        />;
      case 2:
        return <ThirdStep
          handleNext={handleNext}
          handicap_card={handicap_card}
          setHandicap_card={setHandicap_card}
          blind_card={blind_card}
          setBlind_card={setBlind_card}
          identity_card={identity_card}
          setIdentity_card={setIdentity_card}
        />;

      case 3:
        return <FourthStep
          handleNext={handleNext}

        />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const { setCurrentUser } = useContext(AuthContext)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const closeStepper = async () => {
    handleClose();
    // setLogedIn(true);

    await register();
  }

  const upload = async () => {

    // console.log(blind_card)
    // console.log(handicap_card)
    // console.log(identity_card)
    const files = [
      identity_card,
      blind_card,
      handicap_card,
  ]
    const formData = new FormData()
    files.forEach(f=>formData.append('file', f));
    // formData.append('file', identity_card)
    // console.log("🤣😂😊", formData.entries().forEach(f=>console.log(f[0]+""+f[1])) ,"💛🧡🧡❤");
    // multipart/form-data

    try {
      const res = await axios.post(`http://localhost:9660/users/53`, formData, { headers: { "Content-Type": "application/pdf" } })
      console.log(res);
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Button style={{ margin: '10px', color: 'purple', backgroundColor: 'white' }} id='lgnBtn' variant="contained" onClick={handleOpen}>Sign Up</Button>
      {
        identity_card ?
          <PdfViewer url={identity_card} fileName={"identity_card"} ></PdfViewer>
          :
          <MyUploadFile file={identity_card} setFile={setIdentity_card}></MyUploadFile>
      }
      {
        blind_card ?
          <PdfViewer url={blind_card.name} fileName={"blind_card"} ></PdfViewer>
          :
          <MyUploadFile file={blind_card} setFile={setBlind_card}></MyUploadFile>
      }
      {
        handicap_card ?
          <PdfViewer url={handicap_card.name} fileName={"handicap_card"} ></PdfViewer>
          :
          <MyUploadFile file={handicap_card} setFile={setHandicap_card}></MyUploadFile>
      }

      <Button onClick={upload}>upload</Button>


      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      ><Box sx={style}>
          <Typography component="h1" variant="h4" align="center">
            רישום
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            setTimeout(closeStepper, 3000),
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                הרישום הסתיים בהצלחה!
              </Typography>
              <Typography variant="subtitle1">
                תודה שהצטרפתם אלינו!
              </Typography>
            </React.Fragment>

          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    הקודם
                  </Button>
                )}
                {activeStep === steps.length - 1 ?
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {'סיום'}
                  </Button> : <></>}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default Register;