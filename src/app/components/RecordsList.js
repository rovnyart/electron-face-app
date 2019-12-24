import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({ root: { maxHeight: '100%', overflow: 'auto' } });

export default function RecordsList({ data, onSelectRecord }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {data.map(({ id, age, gender, image }) => (
        <ListItem key={id} button onClick={() => onSelectRecord({ age, image, gender })}>
          <ListItemAvatar>
            <Avatar src={image} />
          </ListItemAvatar>
          <ListItemText primary={`gender: ${gender}, age: ${age}`} />
        </ListItem>
      ))}
    </List>
  );
}
