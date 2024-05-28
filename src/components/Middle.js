import React, { useEffect, useState } from "react";
import { ListItem, Paper } from "@mui/material";
import { StarBorderOutlined as StarIcon, Snooze as SnoozeIcon, Inbox as InboxIcon, LocalOffer as LocalOfferIcon, People as PeopleIcon, Update as UpdateIcon } from "@mui/icons-material"; // Import icons from Material-UI
import { Tabs, Tab, Box, IconButton, Checkbox } from "@mui/material"; // Import Checkbox and IconButton
import { Refresh as RefreshIcon, MoreVert as MoreIcon } from "@mui/icons-material"; // Import RefreshIcon and MoreIcon
import { database, auth } from "../firebase/setup";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import remove from "../images/bin.png";
import './middleStyles.css';
import 'boxicons';
import Messageviewer from './Messageviewer'; 
function Middle(props) {
    const [mailData, setMailData] = useState([]);
    const [starredMails, setStarredMails] = useState({});
    const [snoozedMails, setSnoozedMails] = useState({});
    const [selectedTab, setSelectedTab] = useState(0);
    const [refreshing, setRefreshing] = useState(false); // State for refresh
    const [isBlinking, setIsBlinking] = useState(false); 
    const [selectedMessage, setSelectedMessage] = useState(null); // State for selected message
    const deleteMail = async (data) => {
        if (!auth.currentUser || !auth.currentUser.email) {
            console.error("User not logged in or email is null.");
            return;
        }

        const userDoc = doc(database, "users", auth.currentUser.email);
        const subCollection = props.subCollect ? props.subCollect : "Inbox";
        const messageDoc = doc(userDoc, subCollection, data.id);
        const trashDoc = doc(userDoc, "Trash", data.id);

        try {
            await deleteDoc(messageDoc);
            await setDoc(trashDoc, { ...data, deleted: true });
            setMailData(prevData => prevData.filter(mail => mail.id !== data.id));
        } catch (err) {
            console.error(err);
        }
    };

    const getMail = async () => {
        if (!auth.currentUser || !auth.currentUser.email) {
            console.error("User not logged in or email is null.");
            return;
        }

        const userDoc = doc(database, "users", auth.currentUser.email);
        const subCollection = props.subCollect ? props.subCollect : "Inbox";
        const messageDoc = collection(userDoc, subCollection);

        try {
            const data = await getDocs(messageDoc);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setMailData(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchTrashMessages = async () => {
        try {
            if (!auth.currentUser || !auth.currentUser.email) {
                console.error("User not logged in or email is null.");
                return;
            }

            const userDoc = doc(database, "users", auth.currentUser.email);
            const messageDoc = collection(userDoc, "Trash");

            const data = await getDocs(messageDoc);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setMailData(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleStarred = async (data) => {
        try {
            const userDoc = doc(database, "users", auth.currentUser.email);
            const messageDoc = doc(userDoc, "Starred", data.id);

            if (starredMails[data.id]) {
                // Remove from "Starred" collection
                await deleteDoc(messageDoc);
                setStarredMails(prevState => {
                    const updatedState = { ...prevState };
                    delete updatedState[data.id];
                    return updatedState;
                });
            } else {
                // Add to "Starred" collection
                await setDoc(messageDoc, {
                    ...data,
                    starred: true
                });
                setStarredMails(prevState => ({
                    ...prevState,
                    [data.id]: true
                }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const snooze = async (data) => {
        try {
            const userDoc = doc(database, "users", auth.currentUser.email);
            const messageDoc = doc(userDoc, "Snoozed", data.id);
        
            await setDoc(messageDoc, {
                ...data,
                snoozed: true
            });
        
            setSnoozedMails(prevState => ({
                ...prevState,
                [data.id]: true
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStarredMessages = async () => {
        try {
            if (!auth.currentUser || !auth.currentUser.email) {
                console.error("User not logged in or email is null.");
                return;
            }

            const userDoc = doc(database, "users", auth.currentUser.email);
            const subCollection = "Starred";
            const messageDoc = collection(userDoc, subCollection);

            const data = await getDocs(messageDoc);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setMailData(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchSnoozedMessages = async () => {
        try {
            if (!auth.currentUser || !auth.currentUser.email) {
                console.error("User not logged in or email is null.");
                return;
            }

            const userDoc = doc(database, "users", auth.currentUser.email);
            const subCollection = "Snoozed";
            const messageDoc = collection(userDoc, subCollection);

            const data = await getDocs(messageDoc);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setMailData(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    

    useEffect(() => {
        if (props.subCollect === "Starred") {
            fetchStarredMessages();
        } else if (props.subCollect === "Snoozed") {
            fetchSnoozedMessages();
        } else if (props.subCollect === "Trash") {
            fetchTrashMessages();
        } else {
            getMail();
        }
    }, [props.subCollect]);

    const filteredMailData = props.search
        ? mailData.filter((data) => data.sender.includes(props.search))
        : mailData;


         // Define handleTabChange function
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // Other functions remain the same

    const handleRefresh = async () => {
        setIsBlinking(true); // Start the blinking animation
        setRefreshing(true);
        await getMail();
        setRefreshing(false);
        setTimeout(() => {
            setIsBlinking(false); // Stop the blinking animation after 1 second
        }, 1000);
    };

    useEffect(() => {
        if (refreshing) {
            handleRefresh();
        }
    }, [refreshing]);


    const renderMailItems = (data) => (
        <Paper key={data.id} elevation={0} className="paper">
            <ListItem
                className="list-item"
                onMouseEnter={() => setMailData(prevData =>
                    prevData.map(mail =>
                        mail.id === data.id ? { ...mail, show: true } : mail
                    )
                )}
                onMouseLeave={() => setMailData(prevData =>
                    prevData.map(mail =>
                        mail.id === data.id ? { ...mail, show: false } : mail
                    )
                )}
            >
                <div className="list-item-content">
                    <Checkbox /> {/* Checkbox for selecting the email */}
                    <StarIcon
                        onClick={() => toggleStarred(data)}
                        className={`star-icon ${starredMails[data.id] ? 'starred' : ''}`}
                    />
                    <span className="sender">
                        {data.sender}
                        <span className="email">
                            {data.email}
                        </span>
                    </span>
                </div>
                {data.show && (
                    <div className="actions">
                        <SnoozeIcon onClick={() => snooze(data)} className="snooze-icon" />
                        <img
                            onClick={() => deleteMail(data)}
                            src={remove}
                            className="delete-icon"
                            alt="Delete Icon"
                        />
                    </div>
                )}
            </ListItem>
        </Paper>
    );
    
    const handleMessageClick = (message) => {
        setSelectedMessage(message);
    };


    return (
        <div className="container">
            <div className="action-bar">
                <Checkbox /> {/* Checkbox for selecting all emails */}
                <IconButton onClick={() => setRefreshing(true)}> {/* Refresh functionality */}
                    <RefreshIcon />
                </IconButton>
                <IconButton> {/* More options */}
                    <MoreIcon />
                </IconButton>
            </div>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab
                    icon={<InboxIcon />}
                    label="Primary"
                    sx={{ fontSize: '0.85rem', marginRight: '100px' }} // Add margin-right
                />
                <Tab
                    icon={<LocalOfferIcon />}
                    label="Promotions"
                    sx={{ fontSize: '0.85rem', marginRight: '150px' }} // Add margin-right
                />
                <Tab
                    icon={<PeopleIcon />}
                    label="Social"
                    sx={{ fontSize: '0.85rem', marginRight: '180px' }} // Add margin-right
                />
                <Tab
                    icon={<UpdateIcon />}
                    label="Updates"
                    sx={{ fontSize: '0.85rem' }} // No margin-right for the last tab
                />
            </Tabs>
            <Box hidden={selectedTab !== 0}>
                {filteredMailData.map((data) => renderMailItems(data))}
            </Box>
            <Box hidden={selectedTab !== 1}>
                {/* Add content for the "Promotions" tab here if necessary */}
                {filteredMailData.map((data) => renderMailItems(data))}
            </Box>
            <Box hidden={selectedTab !== 2}>
                {/* Add content for the "Social" tab here if necessary */}
                {filteredMailData.map((data) => renderMailItems(data))}
            </Box>
            <Box hidden={selectedTab !== 3}>
                {/* Add content for the "Updates" tab here if necessary */}
                {filteredMailData.map((data) => renderMailItems(data))}
            </Box>
            <h6 className="footer-text">Terms · Privacy · Program Policies</h6>
            {selectedMessage && <Messageviewer message={selectedMessage} />}
        </div>
    );
}

export default Middle;
