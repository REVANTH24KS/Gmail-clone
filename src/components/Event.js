import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addDoc, collection, doc } from 'firebase/firestore'; // Import Firestore functions for adding data
import { database } from '../firebase/setup'; // Import Firestore database from your Firebase setup
import EventIcon from '@mui/icons-material/Event';
import { auth } from '../firebase/setup'; // Import auth from your Firebase setup

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

export default function Event() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [eventName, setEventName] = React.useState('');
  const [eventDate, setEventDate] = React.useState('');

  const addEventToDatabase = async () => {
    const userDoc = doc(database, "users", auth.currentUser.email); // Assuming user-specific events
    const eventRef = collection(userDoc, 'events'); // Create a new collection for events
  
    try {
      await addDoc(eventRef, {
        name: eventName,
        date: eventDate,
      });
      handleClose(); // Close the modal after adding event to database
      setEventName(''); // Clear input fields after adding event
      setEventDate('');
    } catch (error) {
      console.error('Error adding event to database: ', error);
    }
  };

  return (
    <div>
      <EventIcon onClick={handleOpen} style={{ fontSize: "4vw", paddingTop: "2vw", cursor: "pointer" }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ paddingTop: "3vw", fontSize: "1vw", color: "grey" }}>
            Add Event
          </Typography>
          <input
            placeholder='Event'
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            style={{ outline: "none", fontSize: "1vw", width: "calc(100% - 2vw)", height: "1.5vw", marginBottom: "1vw", padding: "0.5vw" }}
          />
          <input
            type='date'
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            style={{ outline: "none", fontSize: "1vw", width: "calc(100% - 2vw)", height: "1.5vw", marginBottom: "1vw", padding: "0.5vw" }}
          />
          <Button onClick={addEventToDatabase} variant='contained' sx={{ fontSize: "1vw", width: "4vw", height: "2vw", marginTop: "1vw", marginRight: "0.5vw" }}>Add</Button>
          <Button variant='contained' sx={{ fontSize: "1vw", width: "4vw", height: "2vw", marginTop: "1vw" }} onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
