import React, {
    ChangeEvent,
    KeyboardEvent,
    useCallback, useEffect,
    useMemo,
    useState
} from 'react';
import c from './App.module.css';
import {MessageType} from "./types";
import {io} from "socket.io-client";

// const socket = io("https://chat--backend.herokuapp.com/");
const socket = io("http://localhost:3010", {transports: ['websocket']});

function App() {
    const [messages, setMessages] = useState<Array<MessageType>>([]);

    const [message, setMessage] = useState('');

    const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
    }

    const onSendButtonClick = () => {
        socket.emit('client-sent-message', message);
        setMessage('');
    };

    const onEnterPress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            onSendButtonClick();
        }
    }, []);

    const messagesList = () => messages.map(message =>
        <div key={message.id}>
            <span>
                <b>{message.user.name}: </b>
            </span>
            <span>
                {message.message}
            </span>
        </div>
    );

    useEffect(() => {
        socket.on('init-messages-published', (messages: Array<MessageType>) => {
            setMessages(messages);
        })
    }, []);

    return (
        <div className={c.app}>
            <div className={c.screen}>
                {
                    messagesList
                }
            </div>
            <div className={c.panel}>
                <textarea
                    value={message}
                    onChange={onChangeMessage}
                    onKeyPress={onEnterPress}
                >
                </textarea>
                <button onClick={onSendButtonClick}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
