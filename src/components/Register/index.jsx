import React, { useState } from "react";
import './Register.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Register(props) {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userId, setUserId] = useState("")
    // const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    // const [birth_year, setBirth_year] = useState(null)
    // const [family_status, setFamily_status] = useState("")
    const [num_of_children, setNum_of_children] = useState(0)
    const [password, setPassword] = useState("")
    // const [blind_card, setBlind_card] = useState("")
    // const [handicap_card, setHandicap_card] = useState("")
    // const [identity_card, setIdentity_card] = useState("")
    // const [handicap_precentage, setHandicap_precentage] = useState(0)

    const sumbit = async () => {
        const user = {
            userId: userId,
            password: password,
            firstName: firstName,
            lastName: lastName,
            // phone: phone,
            email: email,
            // birth_year: birth_year,
            // family_status: family_status,
            // num_of_children: num_of_children,
            //     blind_card: blind_card,
            //     handicap_card: handicap_card,
            //     identity_card: identity_card,
            //     handicap_precentage: handicap_precentage
        }
        console.log("test", user)
        // setErr("")
        // e.preventDefault();

        try {
            await axios.post('http://localhost:9660/auth/register', user);
            navigate("/login")
        } catch (err) {
            alert(err)
            //   setErr(err.response.data?.message);
        }
    }

    const steps = ['הכנסת פרטים אישיים', 'העלאת מסמכים', 'אימות כתובת מייל'];

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }

                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            משתמש נוסף בהצלחה
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </>
    );
}
export default Register





// <div class='container'>
// <div class='window'>
//     <div class='overlay'></div>
//     <div class='content'>
//         <div class='welcome'> להרשם לאתר</div>
//         <div class='subtitle'>We're almost done. Before using our services you need to create an account.</div>
//         <div class='input-fields'>
//             <input type='text' placeholder='תעודת זהות' class='input-line full-width' onChange={(e) => setUserId(e.target.value)}></input>
//             <input type='text' placeholder='שם פרטי' class='input-line full-width' onChange={(e) => setFirstName(e.target.value)}></input>
//             <input type='text' placeholder='שם משפחה' class='input-line full-width' onChange={(e) => setLastName(e.target.value)}></input>
//             {/* <input type='text' placeholder='פלאפון' class='input-line full-width' onChange={(e)=>setPhone(e)}></input> */}
//             <input type='email' placeholder='איימיל' class='input-line full-width' onChange={(e) => setEmail(e.target.value)}></input>
//             {/* <input type='number' placeholder='שנת לידה' class='input-line full-width' onChange={(e)=>setBirth_year(e)}></input> */}
//             {/* status??? */}
//             <input type='number' placeholder='מספר ילדים ' class='input-line full-width' onChange={(e) => setNum_of_children(e.target.value)}></input>
//             <input type='password' placeholder='סיסמה' class='input-line full-width' onChange={(e) => setPassword(e.target.value)}></input>
//         </div>
//         <div><button class='ghost-round full-width' onClick={() => { sumbit() }}>Sign Up</button></div>
//     </div>
// </div>
// </div>
