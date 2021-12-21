import React, {ChangeEvent, useState} from 'react';
import c from './App.module.css';
import {io} from "socket.io-client";

const socket = io("https://chat--backend.herokuapp.com/");

function App() {
    const [messages, setMessages] = useState([
        {
            id: "gsdrtarq",
            message: "Hey Beav",
            user: {id: "1", name: "Butthead"}
        },
        {id: "kjhgjk", message: "Sup dude", user: {id: "2", name: "Beavis"}}
    ]);

    const [message, setMessage] = useState('');

    const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
    }

    const onSendButtonClick = () => {
        socket.emit('client-sent-message', message);
        setMessage('');
    }

    return (
        <div className={c.app}>
            <div className={c.screen}>
                {
                    messages.map(message =>
                        <div key={message.id}>
                            <span>
                                <b>{message.user.name}: </b>
                            </span>
                            <span>
                                {message.message}
                            </span>
                        </div>)
                }
            </div>
            <div className={c.panel}>
                <textarea value={message} onChange={onChangeMessage}>

                </textarea>
                <button onClick={onSendButtonClick}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
