import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import dayjs from "dayjs";

function SecondStep(props) {
    const { handleNext,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        birth_year,
        setBirth_year,
        family_status,
        setFamily_status,
        num_of_children,
        setNum_of_children,
        handicap_precentage,
        setHandicap_precentage,
        phone,
        setPhone
    } = props;

    const [error, setError] = React.useState(false)
    const [hasChildren, setHasChildren] =React.useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!firstName || !lastName || !birth_year || !family_status || !handicap_precentage || !phone) {
            setError(true);
            return;
        }
        handleNext()
    };
    
    return (
        <FormControl >
            <Typography variant="h6" gutterBottom>
                פרטים אישיים
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={7} >
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="שם פרטי"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onBlur={(e) => setFirstName(e.target.value)}
                        defaultValue={firstName}
                        error={error && !firstName}
                        helperText={error && !firstName ? 'Please enter your first name' : ''}
                    />
                </Grid>
                <Grid item xs={7} >
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="שם משפחה"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onBlur={(e) => setLastName(e.target.value)}
                        defaultValue={lastName}
                        error={error && !lastName}
                        helperText={error && !lastName ? 'Please enter your last name' : ''}
                    />
                </Grid>
                <Grid item xs={7} >
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="מספר טלפון"
                        fullWidth
                        variant="standard"
                        onBlur={(e) => setPhone(e.target.value)}
                        defaultValue={phone}
                        error={error && !phone}
                        helperText={error && !phone ? `Please enter phone number` : ''}
                    />
                </Grid>
                <Grid item xs={7} >
                    <TextField
                        required
                        id="birth_year"
                        name="birth_year"
                        label="שנת לידה"
                        fullWidth
                        variant="standard"
                        onBlur={(e) => setBirth_year(e.target.value)}
                        defaultValue={birth_year}
                        error={error && !birth_year}
                        helperText={error && !birth_year ? `Please enter your birth year` : ''}
                    />
                </Grid>

                <Grid item xs={5} >
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">מצב משפחתי</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="מצב משפחתי"
                                onBlur={(e) => {e.target.value > 10? setHasChildren(true): setHasChildren(false); setFamily_status(e.target.value)}}
                                defaultValue=''
                            >
                                <MenuItem value={10}>רווק/ה</MenuItem>
                                <MenuItem value={20}>נשוי/אה</MenuItem>
                                <MenuItem value={30}>אלמן/ה</MenuItem>
                                <MenuItem value={40}>גרוש/ה</MenuItem>
                                <MenuItem value={50}>פרוד/ה</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={7} sx={{display: {hasChildren}}}>
                    <TextField
                        id="num_of_children"
                        name="num_of_children"
                        label="מספר ילדים"
                        fullWidth
                        variant="standard"
                        onBlur={(e) => setNum_of_children(e.target.value)}
                        defaultValue={num_of_children}
                        type='number'
                    />
                </Grid>
                <Grid item xs={7} >
                    <TextField
                        required
                        id="handicap_precentage"
                        name="handicap_precentage"
                        label="אחוזי נכות"
                        fullWidth
                        variant="standard"
                        onBlur={(e) => setHandicap_precentage(e.target.value)}
                        defaultValue={handicap_precentage}
                        error={error && !handicap_precentage}
                        helperText={error && !handicap_precentage ? `Please enter handicap precentage` : ''}
                        type='number'
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, ml: 1 }}
                >
                    {'הבא'}
                </Button>
            </Box>
        </FormControl>
    );
}

export default SecondStep
