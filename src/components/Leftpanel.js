import React, { useState } from "react";
import Message from "./Message";
import './leftStyles.css'; // Import CSS file
import 'boxicons';

function Leftpanel(props) {
    const [selectedItem, setSelectedItem] = useState("Inbox"); // State to track selected menu item

    const handleItemClick = (item) => {
        setSelectedItem(item);
        props.setSubCollect(item); // Set the sub-collection based on the clicked item
    };

    return (
        <div className="left-panel">
            <Message />
            <div
                className={`menu-item ${selectedItem === "Inbox" ? "selected" : ""}`}
                onMouseEnter={() => setSelectedItem("Inbox")}
                onClick={() => handleItemClick("Inbox")}
            >
                <box-icon type="solid" name="inbox"></box-icon>
                <span>Inbox</span>
            </div>

            <div
                className={`menu-item ${selectedItem === "Starred" ? "selected" : ""}`}
                onMouseEnter={() => setSelectedItem("Starred")}
                onClick={() => handleItemClick("Starred")}
            >
                <box-icon type="solid" name="star"></box-icon>
                <span>Starred</span>
            </div>

            <div
                className={`menu-item ${selectedItem === "Snoozed" ? "selected" : ""}`}
                onMouseEnter={() => setSelectedItem("Snoozed")}
                onClick={() => handleItemClick("Snoozed")}
            >
                <box-icon type="solid" name="alarm-snooze"></box-icon>
                <span>Snoozed</span>
            </div>

            <div
                className={`menu-item ${selectedItem === "Send" ? "selected" : ""}`}
                onMouseEnter={() => setSelectedItem("Send")}
                onClick={() => handleItemClick("Send")}
            >
                <box-icon type="solid" name="send"></box-icon>
                <span>Send</span>
            </div>

            <div
                className={`menu-item ${selectedItem === "Trash" ? "selected" : ""}`}
                onMouseEnter={() => setSelectedItem("Trash")}
                onClick={() => handleItemClick("Trash")}
            >
                <box-icon type="solid" name="trash"></box-icon>
                <span>Trash</span>
            </div>
        </div>
    );
}

export default Leftpanel;
