import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form } from 'react-final-form';
import { TextField } from 'final-form-material-ui';

const useStyles = makeStyles({ root: { height: '100%' } });

export default function Image({ data: { image, age, gender } }) {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        {image
          ? (
            <img src={image} width={400} alt="data" />
          ) : (
            <Typography>No data to display</Typography>
          )}
      </Grid>
      <Grid item xs={12}>
        {age && gender && (
          <Form
            initialValues={{ age, gender }}
            onSubmit={() => { }}
            render={() => (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    component={TextField} name="age" label="Age"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    component={TextField} name="gender" label="Gender"
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>
            )}
          />
        )}
      </Grid>
    </Grid>
  );
}
