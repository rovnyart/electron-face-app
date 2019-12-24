import React, { useState, useEffect } from 'react';
import ReactWebcam from 'react-webcam';
import { Grid, Button } from '@material-ui/core';

const HEIGHT = 400;
const WIDTH = 400;

export default function Webcam({ webcamRef, onTakePhoto, disableButton }) {
  const [facingMode, setFacingMode] = useState(null);
  useEffect(() => {
    const startCapture = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const inputDevices = devices.filter(({ kind }) => kind === 'videoinput');
      if (inputDevices.length < 2) setFacingMode('user');
      else setFacingMode({ exact: 'environment' });
    };

    startCapture();
  });

  return (
    <Grid container direction="column" spacing={1} alignItems="center">
      <Grid item xs={12}>
        <ReactWebcam
          ref={webcamRef} width={WIDTH} height={HEIGHT}
          audio={false} screenshotFormat="image/jpeg"
          videoConstraints={{ width: WIDTH, height: HEIGHT, facingMode }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={onTakePhoto} variant="contained" size="large"
          color="primary" disabled={disableButton}
        >
        Take photo
        </Button>
      </Grid>
    </Grid>
  );
}
