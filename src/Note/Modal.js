import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    padding: '2.5rem',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  title: {
    margin: '0.5rem'
  },
  button: {
    margin: '1rem',
    marginBottom: '0',
    background: 'rgb(17, 223, 228)',
    textTransform: 'capitalize'
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();

  const { open, setOpen, addBucket, idx } = props
  const [name, setName] = useState('');

  const handleClose = () => {
    setOpen(false);
    setName('');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <h2 className={classes.title}>Add Bucket</h2>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div>
          <Button
            className={classes.button}
            onClick={() => {
              addBucket(idx, name);
              setName('');
              setOpen(false);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
}