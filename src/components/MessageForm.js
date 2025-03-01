import { useState } from "react";
import { socket } from "../socket";

function MessageForm({ closeForm }) {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        const trimmedUsername = username.trim();
        const trimmedMessage = message.trim();
    
        if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
            alert("Имя должно быть от 3 до 20 символов!");
            return;
        }
    
        if (trimmedMessage.length < 1 || trimmedMessage.length > 80) {
            alert("Сообщение должно быть от 1 до 80 символов!");
            return;
        }
    
        socket.emit("send_message", { username: trimmedUsername, message: trimmedMessage });
        setMessage("");
    };    

    return (
        <div className="form-container fade-in">
            <input type="text" placeholder="Ваш ник" value={username} onChange={(e) => setUsername(e.target.value.slice(0, 20))} />
            <textarea placeholder="Желаемое сообщение" value={message} onChange={(e) => setMessage(e.target.value.slice(0, 80))} maxLength={80} />
            <div className="button-group">
                <button onClick={sendMessage}>Отправить</button>
                <button onClick={closeForm}>Вернуться назад</button>
            </div>
        </div>
    );
}

export default MessageForm;