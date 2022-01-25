import React, {
    ChangeEvent,
    KeyboardEvent,
    useCallback, useEffect,
    useMemo, useRef,
    useState
} from 'react';
import c from './App.module.css';
import {MessageType} from "./types";
import {io} from "socket.io-client";


const socket = io("https://chat--backend.herokuapp.com/");

function App() {
    const [messages, setMessages] = useState<Array<MessageType>>([]);

    const [message, setMessage] = useState<string>('');
    const [name, setName] = useState<string>('');

    const onChangeMessage = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value);
    }, []);

    const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    }, []);

    const onSendButtonClick = () => {
        socket.emit('client-sent-message', message);
        setMessage('');
    };

    const messagesList = useMemo(() => messages.map(message =>
        <div key={message.id}>
            <span>
                <b>{message.user.name}: </b>
            </span>
            <span>
                {message.message}
            </span>
        </div>
    ), [messages]);

    const onSendNameClick = () => {
        socket.emit('client-sent-name', name);
    }

    useEffect(() => {
        socket.on('init-messages-published', (messages: Array<MessageType>) => {
            setMessages(messages);
        })
        socket.on('new-message-received', (message: MessageType) => {
            setMessages(messages => [...messages, message]);
        })
    }, []);

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const messagesAnchorRef = useRef<HTMLDivElement>(null);

    return (
        <div className={c.app}>
            <div className={c.screen}>
                {
                    messagesList
                }
                <div ref={messagesAnchorRef}>

                </div>
            </div>
            <div>
                <input type="text" value={name} onChange={onChangeName}/>
                <button onClick={onSendNameClick}>
                    send name
                </button>
            </div>
            <div className={c.panel}>
                <textarea
                    value={message}
                    onChange={onChangeMessage}
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
