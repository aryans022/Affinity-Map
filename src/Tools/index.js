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
  },
  empty: {
    margin: 'auto'
  }
});


function Tools(props) {

  const [anchor, setAnchor] = useState(null);
  const { addNote, sortNotes, filter, groups, position, setFilter, allBuckets, setGroups } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <IconButton
        className={classes.button}
        onClick={addNote}
      >
        <AddIcon />
      </IconButton>

      <div className={classes.empty} />

      {!groups && <Button
        className={classes.button}
        onClick={sortNotes}
      >
        {position ? 'Standard View' : 'Sorted View'}
      </Button>}

      <Button
        className={classes.button}
        onClick={() => setGroups(!groups)}
      >
        {groups ? 'Ungroup' : 'Group'} Notes
      </Button>

      <Button
        onClick={(event) => setAnchor(event.currentTarget)}
        className={classes.button}
        style={{ marginRight: '1rem' }}
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
          allBuckets.map((currentBucket, i) =>
            <MenuItem
              onClick={() => {
                setFilter(currentBucket)
                setAnchor(null);
              }}
              key={`menuItem${i}`}
            >
              {currentBucket}
            </MenuItem>
          )
        }
      </Menu>

    </div>
  );
}

export default Tools;
