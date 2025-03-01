import { useState, useEffect } from "react";
import { socket } from "./socket";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";
import Background from "./components/Background";
import "./App.css";

function App() {
    const [showForm, setShowForm] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        socket.emit("get_messages");

        socket.on("messages_list", (data) => {
            setMessages(data);
            setIsLoaded(true);
        });

        socket.on("error", (err) => alert(err.error));

        return () => {
            socket.off("messages_list");
            socket.off("error");
        };
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        const interval = setInterval(() => socket.emit("get_messages"), 5000);
        return () => clearInterval(interval);
    }, [isLoaded]);

    return (
        <div className="App">
            <Background />
            <Header />
            {showForm ? (
                <MessageForm closeForm={() => setShowForm(false)} />
            ) : (
                <div>
                    <p>Хотите добавить новое сообщение?</p>
                    <button onClick={() => setShowForm(true)}>Добавить скорее!</button>
                </div>
            )}
            <MessageList messages={messages} />
        </div>
    );
}

export default App;