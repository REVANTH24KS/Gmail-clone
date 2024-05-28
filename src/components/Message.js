import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { addDoc, collection, doc } from 'firebase/firestore';
import { auth, database } from '../firebase/setup'; // Import auth from your Firebase setup
import pen from "../images/pen.png";

const style = {
  position: 'absolute',
  top: '61%',
  left: '71%',
  transform: 'translate(-50%, -50%)',
  width: "40vw",
  height: "35vw",
  minHeight: "505px",
  bgcolor: 'background.paper',
  padding: "1vw",
};

export default function Message() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [mailId, setMailId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const sendToSentItems = async () => {
    const userDoc = doc(database, "users", auth.currentUser.email);
    const messageRef = collection(userDoc, "Send");

    try {
      await addDoc(messageRef, {
        email: message,
        subject: subject,
        sender: auth.currentUser?.displayName // Include sender's display name
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    const userDoc = doc(database, "users", mailId);
    const messageRef = collection(userDoc, "Inbox");

    try {
      await addDoc(messageRef, {
        email: message,
        subject: subject,
        sender: auth.currentUser?.displayName // Include sender's display name
      });
      sendToSentItems();
      handleClose(); // Close the modal after sending
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div onClick={handleOpen} style={{ cursor: "pointer", height: "4.5vw", marginLeft: "1vw", width: "12vw", display: "flex", alignItems: "center", borderRadius: "20px", backgroundColor: "#BEE0FF" }}>
      <box-icon  type="solid" name="message" style={{ width: "2vw", marginLeft: "1vw" }} alt="pen icon" />
        <h4 style={{ marginLeft: "1vw", fontWeight: "400", fontSize: '1.3vw' }}>Compose</h4>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ backgroundColor: "#EDF9FF", position: "absolute", top: "0", left: "0", width: "41vw", padding: "0.5vw", fontSize: "1vw" }}>
            New Message
          </Typography>
          <TextField onChange={(e) => setMailId(e.target.value)} variant='standard' label="To" sx={{ width: "39vw", marginTop: "1vw" }} />
          <br />
          <TextField onChange={(e) => setSubject(e.target.value)} variant='standard' label="Subject" sx={{ width: "39vw" }} />
          <br />
          <TextField onChange={(e) => setMessage(e.target.value)} multiline rows={12} sx={{ width: "39vw", "& fieldset": { border: "none" } }} />
          <br />
          <Button onClick={sendMessage} variant="contained" sx={{ borderRadius: "6vw", fontSize: "1vw", width: "4vw", height: "3vw" }}>
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
