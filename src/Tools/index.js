import React, { useState } from 'react';
import { IconButton, Button, Menu, MenuItem, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  button: {
    margin: '0 0 0 1rem',
    background: 'rgb(17, 223, 228)',
    display: 'inline-block',
    textTransform: 'none',
    '&:hover': {
      background: 'rgb(50, 250, 250)',
    }
  }
});


function Tools(props) {

  const [anchor, setAnchor] = useState(null);
  const { addNote, sortNotes, filter, setFilter, allBuckets } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <IconButton
        className={classes.button}
        onClick={addNote}
      >
        <AddIcon />
      </IconButton>

      <Button
        className={classes.button}
        style={{marginLeft: 'auto'}}
        onClick={sortNotes}
      >
        Sort Notes
      </Button>

      <Button
        onClick={(event) => setAnchor(event.currentTarget)}
        className={classes.button}
        style={{marginRight: '1rem'}}
      >
        {filter ? filter : 'No Filter'}
      </Button>

      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={() => { setAnchor(null) }}
      >

        <MenuItem onClick={() => {
          setFilter(null);
          setAnchor(null);
        }}
        >
          No Filter
        </MenuItem>

        {
          allBuckets.map(currentBucket =>
            <MenuItem onClick={() => {
              setFilter(currentBucket)
              setAnchor(null);
            }}>
              {currentBucket}
            </MenuItem>
          )
        }
      </Menu>

    </div>
  );
}

export default Tools;
