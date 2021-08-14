import React, { useState } from 'react';
import Note from '../Note';
import Draggable from 'react-draggable';

function NoteHolder(props) {

  let { reqNotes, notes, setNotes, addBucket, allBuckets, position, groups, currentBucket, setCurrentBucket } = props;
  const [maxIndex, setMaxIndex] = useState(localStorage?.maxIndex ? JSON.parse(localStorage.maxIndex) : 0);

  const setText = (idx, newText) => {
    let temp = [...notes];
    temp[idx].text = newText;
    setNotes(temp);
    localStorage.setItem('notes', JSON.stringify(temp));
  }

  const removeNote = (idx) => {
    let temp = [...notes];
    temp.splice(idx, 1);
    setNotes(temp);
    localStorage.setItem('notes', JSON.stringify(temp));
  }

  const setBucket = (idx, newBucket) => {
    let temp = [...notes];
    temp[idx].bucket = newBucket;
    setNotes(temp);
    localStorage.setItem('notes', JSON.stringify(temp));
  }

  position = groups ? { x: 0, y: 0 } : position;

  return (
    <>
      {reqNotes.map((note, i) => (
        <Draggable
          key={i}
          position={position}
          onStart={() => {
            let temp = [...notes];
            temp[note.idx].zIndex = maxIndex + 1;
            temp[note.idx].pointerEvents = 'none';
            setNotes(temp);
            setMaxIndex(maxIndex + 1);
            localStorage.setItem('maxIndex', maxIndex + 1);
            localStorage.setItem('notes', JSON.stringify(temp));
          }}
          onStop={() => {
            let temp = [...notes];
            temp[note.idx].pointerEvents = 'all';
            if (position && currentBucket) {
              temp[note.idx].bucket = currentBucket;
            }
            setNotes(temp);
            localStorage.setItem('notes', JSON.stringify(temp));
          }}
        >
          <div
            style={{ pointerEvents: note.pointerEvents, zIndex: note.zIndex }}
            onMouseEnter={() => {
              !groups && setCurrentBucket(note.bucket);
            }}
            onMouseLeave={() => {
              !groups && setCurrentBucket(null);
            }}
          >
            <Note
              text={note.text}
              color={note.color}
              bucket={note.bucket}
              allBuckets={allBuckets}
              addBucket={addBucket}
              setText={setText}
              removeNote={removeNote}
              setBucket={setBucket}
              idx={note.idx}
              key={`note${i}`}
            />
          </div>
        </Draggable>
      ))}
    </>
  );
}

export default NoteHolder;
