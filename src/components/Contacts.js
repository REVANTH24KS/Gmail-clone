import React, { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import { doc, collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, database } from '../firebase/setup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

export default function Contacts() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [contacts, setContacts] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addContact = async () => {
    try {
      const userDoc = doc(database, "users", auth.currentUser.email);
      const contactsRef = collection(userDoc, "Contacts");

      await addDoc(contactsRef, { name, mobile });
      setName('');
      setMobile('');
      // Refresh the contacts list after adding a new contact
      showContacts();
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  const showContacts = async () => {
    try {
      const userDoc = doc(database, "users", auth.currentUser.email);
      const contactsRef = collection(userDoc, "Contacts");
      const data = await getDocs(contactsRef);
      const contactsList = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsList);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  return (
    <div>
      <AccountCircleIcon
        onClick={handleOpen}
        style={{ fontSize: "3vw", paddingTop: "1vw", cursor: "pointer" }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ paddingTop: "3vw", fontSize: "1vw", color: "grey" }}>
            Add Contacts
          </Typography>
          <input
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ outline: "none", fontSize: "1vw", width: "calc(100% - 2vw)", height: "1.5vw", marginBottom: "1vw", padding: "0.5vw" }}
          />
          <input
            placeholder='Mobile'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{ outline: "none", fontSize: "1vw", width: "calc(100% - 2vw)", height: "1.5vw", marginBottom: "1vw", padding: "0.5vw" }}
          />
          <Button onClick={addContact} variant='contained' sx={{ fontSize: "1vw", width: "4vw", height: "2vw", marginTop: "1vw", marginRight: "0.5vw" }}>Add</Button>
          <Button onClick={showContacts} variant='contained' sx={{ fontSize: "1vw", width: "4vw", height: "2vw", marginTop: "1vw" }}>Show</Button>
          <div>
            <Typography sx={{ paddingTop: "1vw", fontSize: "1vw", color: "grey" }}>
              Contacts:
            </Typography>
            <ul>
              {contacts.map((contact, index) => (
                <li key={index}>{contact.name} - {contact.mobile}</li>
              ))}
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
