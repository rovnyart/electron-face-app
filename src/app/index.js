import path from 'path';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Grid, Paper, Typography, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as faceApi from 'face-api.js';
import { remote } from 'electron';

import { useData, create } from './apiServices';
import Webcam from './components/Webcam';
import ImageView from './components/Image';
import { showError } from './components/notifications';
import RecordsList from './components/RecordsList';

const { app } = remote;

faceApi.env.monkeyPatch({
  createCanvasElement: () => document.createElement('canvas'),
  createImageElement: () => document.createElement('img'),
});


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  paper: { padding: theme.spacing(2), height: theme.spacing(60) },
}));

export default function App() {
  const { data, isLoading, loadData } = useData();
  const classes = useStyles();
  const webcamRef = useRef(null);
  const [selected, setSelected] = useState({});
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const setup = async () => {
      const modelPath = path.resolve(app.getAppPath(), './src/app/models');
      await Promise.all([
        faceApi.nets.ageGenderNet.loadFromDisk(modelPath),
        faceApi.nets.ssdMobilenetv1.loadFromDisk(modelPath),
      ]);
    };
    setup();
  }, []);

  useEffect(() => {
    const [row = {}] = data;
    setSelected(row);
  }, [data]);

  const handleTakePhoto = useCallback(async () => {
    try {
      setIsDetecting(true);
      const captured = webcamRef.current.getScreenshot();
      const fetched = await faceApi.fetchImage(captured);
      const detected = await faceApi.detectSingleFace(fetched).withAgeAndGender() || {};
      if (!detected.age || !detected.gender) throw new Error('Error processing image or no face detected');
      const parsedAge = parseInt(String(detected.age), 10);
      await create({ age: parsedAge, gender: detected.gender, image: captured });
      await loadData();
      setIsDetecting(false);
    } catch (error) {
      setIsDetecting(false);
      showError(error.message);
    }
  }, [loadData]);

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">FaceAge</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-between" spacing={2}>
            <Grid item xs={4}>
              {isLoading && <LinearProgress mode="query" />}
              <Paper className={classes.paper}>
                <RecordsList data={data} onSelectRecord={setSelected} />
              </Paper>
            </Grid>

            <Grid item xs={4}>
              {isDetecting && <LinearProgress mode="query" />}
              <Paper className={classes.paper}>
                <ImageView data={selected} />
              </Paper>
            </Grid>

            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <Webcam
                  onTakePhoto={handleTakePhoto} webcamRef={webcamRef} disableButton={isLoading || isDetecting}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
