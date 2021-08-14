import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Tools from './Tools';
import NoteHolder from './NoteHolder';
import Draggable from 'react-draggable';

const useStyles = makeStyles({
  root: {
    height: '100vh'
  },
  title: {
    fontSize: '1.8rem',
    padding: '1rem',
    margin: '0rem',
    textAlign: 'center'
  },
  notesContainer: {
    marginTop: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    position: 'relative'
  },
  emptyMessage: {
    textAlign: 'center'
  },
  grouped: {
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '1rem 0',
    textTransform: 'capitalize'
  },
  groupHeading: {
    color: 'white',
    textAlign: 'center',
    width: '100%'
  }
});

const colors = [
  'rgb(248, 221, 128)',
  'rgb(134, 206, 252)',
  'rgb(224, 167, 249)',
  'rgb(137, 243, 167)',
  'rgb(242, 131, 132)'
]

function App() {

  const classes = useStyles();
  const [notes, setNotes] = useState(localStorage?.notes ? JSON.parse(localStorage.notes) : []);
  const [buckets, setBuckets] = useState(localStorage?.buckets ? JSON.parse(localStorage.buckets) : []);
  const [filter, setFilter] = useState(null);
  const [groups, setGroups] = useState(false);
  const [position, setPosition] = useState(null);
  const [currentBucket, setCurrentBucket] = useState(null);

  const addNote = () => {
    const temp = [...notes,
    {
      text: '',
      color: colors[Math.floor(Math.random() * colors.length)],
      bucket: '',
      zIndex: 0,
      pointerEvents: 'all'
    }]
    setNotes(temp);
    setFilter(null);
    localStorage.setItem('notes', JSON.stringify(temp));
  }

  const addBucket = (idx, name) => {

    name = name.trim().toLowerCase();

    if (name === '' || buckets.includes(name)) return;

    let temp = [...notes];
    temp[idx].bucket = name;
    setNotes(temp);
    setBuckets([...buckets, name]);
    localStorage.setItem('notes', JSON.stringify(temp));
    localStorage.setItem('buckets', JSON.stringify([...buckets, name]));
  }

  const sortNotes = () => {
    let temp = [...notes]
    temp.sort((a, b) => (a.bucket > b.bucket) ? 1 : ((b.bucket > a.bucket) ? -1 : 0));
    setNotes(temp);
    setPosition(position ? null : { x: 0, y: 0 });
    localStorage.setItem('notes', JSON.stringify(temp));
  }

  let displayNotes = [...notes];
  for (let i = 0; i < displayNotes.length; i++) {
    displayNotes[i] = { ...displayNotes[i], idx: i }
  }

  if (filter) {
    displayNotes = displayNotes.filter(note => note.bucket === filter);
  }

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Affinity Map</h1>

      <Tools
        allBuckets={buckets}
        filter={filter}
        groups={groups}
        position={position}
        addNote={addNote}
        sortNotes={sortNotes}
        setFilter={setFilter}
        setGroups={setGroups}
      />

      <div className={classes.notesContainer}>

        {!groups &&
          <NoteHolder
            reqNotes={displayNotes}
            notes={notes}
            setNotes={setNotes}
            addBucket={addBucket}
            allBuckets={buckets}
            position={position}
            currentBucket={currentBucket}
            setCurrentBucket={setCurrentBucket}
          />
        }

        {groups && buckets.map((bucket, i) => {

          const bucketNotes = displayNotes.filter(note => note.bucket === bucket);
          if (bucketNotes.length === 0) return null;

          return (
            <div
              className={classes.grouped}
              key={`bucket${i}`}
              onMouseEnter={() => {
                setCurrentBucket(bucketNotes[0]?.bucket);
              }}
              onMouseLeave={() => {
                setCurrentBucket(null);
              }}
            >
              <h3 className={classes.groupHeading}>{bucketNotes[0]?.bucket}</h3>
              <NoteHolder
                reqNotes={bucketNotes}
                notes={notes}
                setNotes={setNotes}
                addBucket={addBucket}
                allBuckets={buckets}
                position={position}
                groups={groups}
                currentBucket={currentBucket}
                setCurrentBucket={setCurrentBucket}
              />
            </div>
          )
        }
        )}

        {notes.length === 0 ?
          <div className={classes.emptyMessage}>
            No notes yet.<br />
            Add one now using the + button.
          </div>
          :
          null
        }

      </div>

    </div>
  );
}

export default App;
