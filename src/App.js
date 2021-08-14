import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Tools from './Tools';
import Note from './Note';
import GroupHighlights from './GroupHighlights';
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
  const [buckets, setBuckets] = useState(localStorage?.notes ? JSON.parse(localStorage.buckets) : []);
  const [filter, setFilter] = useState(null);
  const [groups, setGroups] = useState(false);
  const [position, setPosition] = useState(null);
  const [maxIndex, setMaxIndex] = useState(0);
  const [currentBucket, setCurrentBucket] = useState(null);

  const setText = (idx, newText) => {
    let temp = [...notes];
    temp[idx].text = newText;
    setNotes(temp);
  }

  const removeNote = (idx) => {
    let temp = [...notes];
    temp.splice(idx, 1);
    setNotes(temp);
  }
  const addNote = () => {
    setNotes([
      ...notes,
      {
        text: '',
        color: colors[Math.floor(Math.random() * colors.length)],
        bucket: '',
        zIndex: 0,
        pointerEvents: 'all'
      }
    ]);
    setFilter(null);
  }

  const addBucket = (idx, name) => {

    name = name.trim().toLowerCase();

    if (name === '' || buckets.includes(name)) return;

    let temp = [...notes];
    temp[idx].bucket = name;
    setNotes(temp);
    setBuckets([...buckets, name]);
    localStorage.setItem('buckets', JSON.stringify([...buckets, name]));
  }
  const setBucket = (idx, newBucket) => {
    let temp = [...notes];
    temp[idx].bucket = newBucket;
    setNotes(temp);
  }

  const sortNotes = () => {
    let temp = [...notes]
    temp.sort((a, b) => (a.bucket > b.bucket) ? 1 : ((b.bucket > a.bucket) ? -1 : 0));
    setNotes(temp);
    setPosition(position ? null : { x: 0, y: 0 });
  }

  let displayNotes = [...notes];
  for (let i = 0; i < displayNotes.length; i++) {
    displayNotes[i] = { ...displayNotes[i], idx: i }
  }

  if (filter) {
    displayNotes = displayNotes.filter(note => note.bucket === filter);
  }
  localStorage.setItem('notes', JSON.stringify(notes));

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

        {!groups && displayNotes.map((note, i) => (
          <Draggable
            key={i}
            position={position}
            onStart={() => {
              let temp = [...notes];
              temp[note.idx].zIndex = maxIndex + 1;
              temp[note.idx].pointerEvents = 'none';
              setNotes(temp);
              setMaxIndex(maxIndex + 1);
            }}
            onStop={() => {
              let temp = [...notes];
              temp[note.idx].pointerEvents = 'all';
              if (position && currentBucket) {
                temp[note.idx].bucket=currentBucket;
              }
              setNotes(temp);
            }}
          >
            <div
              style={{ pointerEvents: note.pointerEvents, zIndex: note.zIndex}}
              onMouseEnter={()=>{
                setCurrentBucket(note.bucket);
              }}
              onMouseLeave={()=>{
                setCurrentBucket(null);
              }}
            >
              <Note
                text={note.text}
                color={note.color}
                bucket={note.bucket}
                setText={setText}
                removeNote={removeNote}
                addBucket={addBucket}
                setBucket={setBucket}
                allBuckets={buckets}
                idx={note.idx}
              />
            </div>
          </Draggable>
        ))}

        {groups && buckets.map((bucket) => {

          const bucketNotes = displayNotes.filter(note => note.bucket === bucket);
          if (bucketNotes.length === 0) return null;

          return (
            <GroupHighlights
              displayNotes={bucketNotes}
              allBuckets={buckets}
              setText={setText}
              removeNote={removeNote}
              addBucket={addBucket}
              setBucket={setBucket}
              key={`${bucket}`}
            />
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
