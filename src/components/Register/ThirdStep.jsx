import { Link } from "react-router-dom"
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react'
import { Box, TextField } from "@mui/material";
import { FormControl } from "@mui/material";

function ThirdStep(props) {
  const { handleNext, handicap_card, setHandicap_card, blind_card, setBlind_card, identity_card, setIdentity_card } = props

  const [error, setError] = React.useState(false)

  const handleSubmit = (event) => {
      event.preventDefault();
      if (!handicap_card || !blind_card || !identity_card) {
          setError(true);
          return;
      }
      handleNext()
  };

  return (
    <React.Fragment>
      <FormControl>
        <Typography variant="h5" gutterBottom>
          העלאת מסמכים
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={7} >
            <TextField
              required
              id="identity_card"
              name="identity_card"
              label="תעודת זהות"
              fullWidth
              variant="standard"
              onBlur={(e) => setIdentity_card(e.target.value)}
              defaultValue={identity_card}
              error={error && !identity_card}
              helperText={error && !identity_card ? `Please upload your identity card` : ''}
            />
          </Grid>
          <Grid item xs={7} >
            <TextField
              required
              id="handicap_card"
              name="handicap_card"
              label="תעודת נכה"
              fullWidth
              autoComplete=""
              variant="standard"
              onBlur={(e) => setHandicap_card(e.target.value)}
              defaultValue={handicap_card}
              error={error && !handicap_card}
              helperText={error && !handicap_card ? 'Please upload your handicap card' : ''}
            />
          </Grid>
          <Grid item xs={7} >
            <TextField
              required
              id="blind_card"
              name="blind_card"
              label="שם משפחה"
              fullWidth
              autoComplete=""
              variant="standard"
              onBlur={(e) => setBlind_card(e.target.value)}
              defaultValue={blind_card}
              error={error && !blind_card}
              helperText={error && !blind_card ? 'Please upload your blind card' : ''}
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
    </React.Fragment>
  );
}

export default ThirdStep;


