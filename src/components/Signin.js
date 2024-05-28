import React from 'react';
import { Button } from '@mui/material';
import google from "../images/google.png";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, database } from '../firebase/setup';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';

function Signin() {
  const navigate = useNavigate();

  const addUser = async () => {
    const userDoc = doc(database, "users", auth.currentUser.email);
    try {
      await setDoc(userDoc, {
        username: auth.currentUser.displayName,
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
      });
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      addUser();
      navigate("/Main"); // Navigate to the "/Main" route after successful sign-in
    } catch (error) {
      console.log('Error signing in with Google: ', error);
    }
  };

  return (
    <div style={{ position: "absolute", top: "20%", left: "30%", padding: "110px" }}>
      <div style={{ border: "1px solid grey", padding: "20px", textAlign: "center", borderRadius: "5px", minHeight: "310px", maxWidth: "350px" }}>
        <img style={{ width: "70px" }} src={google} alt="Google Sign In" />
        <h2 style={{ fontWeight: "200" }}>Create your Google Clone account</h2>
        <h3 style={{ fontWeight: "200" }}>Click the sign-in button</h3>
        <Button onClick={googleSignIn} variant="contained">Sign in With Google</Button>
      </div>
    </div>
  );
}

export default Signin;
