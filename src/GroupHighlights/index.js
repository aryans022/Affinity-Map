import React from 'react';
import { makeStyles } from '@material-ui/core';
import Note from '../Note';

const useStyles = makeStyles({
  root: {
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '1rem 0',
    textTransform: 'capitalize'
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    width: '100%'
  }
});

function GroupHighlights(props) {

  const classes = useStyles();
  const { displayNotes, setText, removeNote, addBucket, allBuckets, setBucket} = props;

  return (
    <div
      className={classes.root}
    >
      <h3 className={classes.heading}>{displayNotes[0]?.bucket}</h3>
      {displayNotes.map((note, i) => (
        <Note
          text={note.text}
          color={note.color}
          bucket={note.bucket}
          setText={setText}
          removeNote={removeNote}
          addBucket={addBucket}
          setBucket={setBucket}
          allBuckets={allBuckets}
          idx={note.idx}
          key={`note${i}`}
        />
      ))}
    </div>
  );
}

export default GroupHighlights;
