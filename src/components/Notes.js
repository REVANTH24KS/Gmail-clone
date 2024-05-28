import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import tasks from "../images/tasks.png";
import { auth, database } from '../firebase/setup';
import { doc, collection, addDoc, getDocs } from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '92%',
  transform: 'translate(-50%, -50%)',
  width: "14vw",
  minHeight: "650px",
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: "1vw",
};

export default function Notes() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notes, setNotes] = useState("");
  const [notesData, setNotesData] = useState([]);

  const addNote = async () => {
    try {
      const userDoc = doc(database, "users", auth.currentUser.email);
      const notesRef = collection(userDoc, "Notes");

      await addDoc(notesRef, { notes: notes });
      setNotes("");
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const showNotes = async () => {
    try {
      const userDoc = doc(database, "users", auth.currentUser.email);
      const notesRef = collection(userDoc, "Notes");
      const data = await getDocs(notesRef);
      const notesList = data.docs.map(doc => doc.data().notes);
      setNotesData(notesList);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    showNotes();
  }, []);

  return (
    <div>
      <img onClick={handleOpen} src={tasks} style={{ width: "2vw", paddingTop: "2vw", cursor: "pointer" }} alt="Tasks Icon" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ paddingTop: "3vw", fontSize: "1vw", color: "grey" }}>
            Add Notes
          </Typography>
          <input
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            placeholder='Notes'
            style={{ outline: "none", fontSize: "1vw", width: "calc(100% - 2vw)", height: "1.5vw", marginBottom: "1vw", padding: "0.5vw" }}
          />
          <Button onClick={addNote} variant='contained' sx={{ fontSize: "1vw", width: "4vw", height: "2vw", marginTop: "1vw", marginRight: "0.5vw" }}>Add</Button>
          <Button onClick={showNotes} variant='contained' sx={{ fontSize: "1vw", width: "4vw", height: "2vw", marginTop: "1vw" }}>Show</Button>
          <div>
            <Typography sx={{ paddingTop: "1vw", fontSize: "1vw", color: "grey" }}>
              Notes:
            </Typography>
            <ul>
              {notesData.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
