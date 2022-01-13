import React, {
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useMemo,
    useState
} from 'react';
import c from './App.module.css';
import {io} from "socket.io-client";

const socket = io("https://chat--backend.herokuapp.com/");

function App() {
    const [messages, setMessages] = useState<Array<any>>([]);

    const [message, setMessage] = useState('');

    const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
    }

    const onSendButtonClick = useCallback(() => {
        socket.emit('client-sent-message', message);
        setMessage('');
    }, []);

    const onEnterPress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            onSendButtonClick();
        }
    }, []);

    const messagesList = useMemo(() => messages.map(message =>
        <div key={message.id}>
            <span>
                <b>{message.user.name}: </b>
            </span>
            <span>
                {message.message}
            </span>
        </div>
    ), []);

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
