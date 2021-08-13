import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SimpleModal from './Modal';

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    padding: '0.5rem',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    minHeight: '15rem',
    width: '10rem',
    margin: '1rem',
    display: 'inline-block',
    position: 'relative'
  },
  noteText: {
    height: '13rem',
    width: '100%',
    padding: '0px',
    border: 'none',
    outline: 'none',
    background: 'rgba(0, 0, 0, 0)',
    fontSize: '1rem',
    resize: 'none',
    marginTop: '0.5rem'
  },
  closeButton: {
    display: 'block',
    position: 'absolute',
    padding: '0.2rem',
    margin: '0.3rem',
    top: '0',
    right: '0'
  },
  closeIcon: {
    height: '1.3rem',
    width: '1.3rem'
  },
  bucket: {
    display: 'inline',
    position: 'relative',
    maxWidth: '8rem',
    overflow: 'hidden',
    background: 'rgb(53, 77, 144)',
    borderRadius: '0.4rem',
    padding: '0.1rem 0.5rem',
    margin: '0 0.2rem',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      background: 'rgb(53, 77, 144)',
    }
  }
});

function Note(props) {

  const [anchor, setAnchor] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const { text, color, bucket, setText, removeNote, addBucket, allBuckets, setBucket, idx } = props;

  const handleClick = (event) => {
    const { value } = event.currentTarget.dataset;
    setBucket(idx, value);
    setAnchor(null);
  }

  return (
    <div
      className={classes.root}
      style={{
        background: color
      }}
    >
      <div>

        <Button
          onClick={(event) => setAnchor(event.currentTarget)}
          className={classes.bucket}
        >
          {bucket ? bucket : 'Add Bucket'}
        </Button>
        
        <Menu
          anchorEl={anchor}
          keepMounted
          open={Boolean(anchor)}
          onClose={() => { setAnchor(null) }}
        >

          <MenuItem onClick={() => {
            setOpen(true);
            setAnchor(null);
          }}
          >
            Add Bucket
          </MenuItem>

          {
            allBuckets.map(currentBucket =>
              <MenuItem
                onClick={handleClick}
                data-value={currentBucket}
              >
                {currentBucket}
              </MenuItem>
            )
          }
        </Menu>

        <IconButton
          onClick={() => removeNote(idx)}
          className={classes.closeButton}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>

      </div>

      <textarea
        className={classes.noteText}
        value={text}
        onChange={e => setText(idx, e.target.value)}
      />

      <SimpleModal
        open={open}
        setOpen={setOpen}
        addBucket={addBucket}
      />

    </div>
  );
}

export default Note;
