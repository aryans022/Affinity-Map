import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Tools from './Tools';
import Note from './Note';
import GroupHighlights from './GroupHighlights';

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
    justifyContent: 'space-around'
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
        bucket: ''
      }
    ]);
    setFilter(null);
  }

  const addBucket = (idx, name) => {

    name = name.trim();

    if (name === '' || buckets.includes(name)) return;

    let temp = [...notes];
    temp[idx].bucket = name;
    setNotes(temp);
    setBuckets([...buckets, name]);
  }
  const setBucket = (idx, newBucket) => {
    let temp = [...notes];
    temp[idx].bucket = newBucket;
    setNotes(temp);
  }

  const sortNotes = () => {
    let temp = [...notes]
    temp.sort((a, b) => (a.bucket > b.bucket) ? 1 : ((b.bucket > a.bucket) ? -1 : 0));
    setNotes(temp)
  }

  let displayNotes = [...notes];
  for(let i = 0; i < displayNotes.length; i++) {
    displayNotes[i] = {...displayNotes[i], idx: i}
  }

  if (filter) {
    displayNotes = displayNotes.filter(note => note.bucket === filter);
  }
  localStorage.setItem('notes', JSON.stringify(notes));
  localStorage.setItem('buckets', JSON.stringify(buckets));

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Affinity Map</h1>

      <Tools
        allBuckets={buckets}
        filter={filter}
        groups={groups}
        addNote={addNote}
        sortNotes={sortNotes}
        setFilter={setFilter}
        setGroups={setGroups}
      />

      <div className={classes.notesContainer}>

        {!groups && displayNotes.map((note, i) => (
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
            key={i}
          />
        ))}

        {groups && buckets.map((bucket) => {

          const bucketNotes = displayNotes.filter(note => note.bucket === bucket);
          if (bucketNotes.length===0) return null;

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
