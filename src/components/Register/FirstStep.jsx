import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useState } from 'react';


function FirstStep(props) {
  const { userId, email, password, handleNext, setPassword, setUserId, setEmail } = props;
  const [verifyPassword, setVerifyPassword] = useState();
  const [error, setError] = React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userId || !email || !password || password != verifyPassword) {
      setError(true);
      return;
    }
    handleNext()
  };
  return (
    <FormControl >
      <Typography variant="h6" gutterBottom>
        רישום למערכת
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <TextField
            required
            id="userId"
            name="userId"
            label="מספר זהות"
            fullWidth
            autoComplete="123456789"
            variant="standard"
            onBlur={(e) => setUserId(e.target.value)}
            defaultValue={userId}
            error={error && !userId}
            helperText={error && !userId ? 'Please enter a ID number' : ''}
          />
        </Grid>
        <Grid item xs={7} >
          <TextField
            required
            id="email"
            name="email"
            label="כתובת מייל"
            fullWidth
            autoComplete="email"
            variant="standard"
            onBlur={(e) => setEmail(e.target.value)}
            defaultValue={email}
            error={error && !email}
            helperText={error && !email ? 'Please enter a valid email address' : ''}
          />
        </Grid>
        <Grid item xs={7} >
          <TextField
            required
            id="password"
            name="password"
            label="סיסמא"
            type={password}
            fullWidth
            autoComplete="new-password"
            variant="standard"
            onBlur={(e) => setPassword(e.target.value)}
            defaultValue={password}
            error={error && !password}
            helperText={error && !password ? 'Please enter a password' : ''}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            required
            type={password}
            id="verifyPassword"
            name="verifyPassword"
            label="אימות סיסמא"
            onBlur={(e) => setVerifyPassword(e.target.value)}
            error={error && !verifyPassword || error && verifyPassword === password}
            helperText={error && (!verifyPassword || verifyPassword === password )? 'Please enter a verify password' : ''}
            fullWidth
            variant="standard"
            defaultValue=''
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

export default FirstStep;

