import React from 'react';

function Modal(props) {
    return (
        <div style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 100,
            width : "100vw",
            height : "100vh",
            backgroundColor : "gray",
            opacity : "0.5",
            display: 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            fontSize: "2em",
            fontWeight: "bold",
            userSelect: "none"
        }}>
            Please waiting for opponent...
        </div>
    );
}

export default Modal;