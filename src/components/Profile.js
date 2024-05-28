import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import { auth} from '../firebase/setup';
import logout from "../images/logout.png";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '34%',
  left: '79%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  height: "20vw",
  bgcolor: '#D8e4f0',
  boxShadow: 24,
  borderRadius: "4vw",
  padding: "2vw"
};

export default function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logoutAccount = async () => {
    try {
      await signOut(auth);
      navigate("/Signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Avatar
        onClick={handleOpen}
        sx={{ position: "fixed", left: "96%", top: "2.5%", width: "2.7vw", height: "2.7vw", cursor: "pointer" }}
        src={auth.currentUser?.photoURL}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ textAlign: "center", fontSize: "1.2vw", marginTop: "1.2vw" }}>
            {auth.currentUser?.email}
          </Typography>
          <Avatar src={auth.currentUser?.photoURL} style={{ marginLeft: "11.6vw", width: "6vw", height: "6vw" }} />
          <Typography sx={{ textAlign: "center", fontSize: "1.7vw" }}>
            Hi, {auth.currentUser?.displayName}
          </Typography>
          <Button
            onClick={logoutAccount}
            variant="contained"
            style={{
              cursor: "pointer",
              fontSize: "1vw",
              borderRadius: "2vw",
              marginTop: "2vw",
              width: "14vw",
              height: "4vw",
              marginLeft: "7.5vw",
              backgroundColor: "white",
              color: "black"
            }}
          >
            <img src={logout} alt="Logout" style={{ width: "0.8vw" }} />
            Sign out
          </Button>
          
        </Box>
      </Modal>
    </div>
  );
}
