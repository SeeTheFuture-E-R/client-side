import { Link } from "react-router-dom"
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react'
import { Box, TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import MyUploadFile from './UploadFile'
import PdfViewer from '../Viewer';

function ThirdStep(props) {
  const { handleNext, handicap_card, setHandicap_card, blind_card, setBlind_card, identity_card, setIdentity_card } = props

  const [error, setError] = React.useState(false)

  const handleSubmit = (event) => {
      event.preventDefault();
      // if (!handicap_card || !blind_card || !identity_card) {
      //     setError(true);
      //     return;
      // }
      handleNext()
  };

  return (
    <React.Fragment>
      <FormControl sx={{textAlign:"center"}}>
        <Typography variant="h5" gutterBottom>
          העלאת מסמכים
        </Typography>
        {/* <Grid container spacing={3}>
          <Grid item xs={7} >
          {
      identity_card ?
        <PdfViewer url={identity_card.name} fileName={"identity_card"} ></PdfViewer>
        :
        <MyUploadFile file={identity_card} setFile={setIdentity_card}></MyUploadFile>
      }
          </Grid>
          <Grid item xs={7} >
          {
      blind_card ?
        <PdfViewer url={blind_card.name} fileName={"blind_card"} ></PdfViewer>
        :
        <MyUploadFile file={blind_card} setFile={setBlind_card}></MyUploadFile>
      }
          </Grid>
          <Grid item xs={7} >
          {
      handicap_card ?
        <PdfViewer url={handicap_card.name} fileName={"handicap_card"} ></PdfViewer>
        :
        <MyUploadFile file={handicap_card} setFile={setHandicap_card}></MyUploadFile>
      }

          </Grid>
        </Grid> */}
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


