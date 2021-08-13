import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();

  const { open, setOpen, addBucket } = props
  const [name, setName] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <h2>Add Bucket</h2>
        <TextField
          label="Bucket Name"
          onChange={e => setName(e.target.value)}
        />
        <Button onClick={() => {addBucket(name); setOpen(false)}}>Add</Button>
      </div>
    </Modal>
  );
}