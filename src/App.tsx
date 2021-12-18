import React, {useState} from 'react';
import c from './App.module.css';

function App() {
    const [messages, setMessages] = useState([
        {
            id: "gsdrtarq",
            message: "Hey Beav",
            user: {id: "jhgfhj", name: "Butthead"}
        },
        {id: "kjhgjk", message: "Sup dude", user: {id: "hjfg", name: "Beavis"}}
    ]);

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
                <textarea>

                </textarea>
                <button>
                    Send
                </button>
            </div>
        </div>
    );
}

export default App;
