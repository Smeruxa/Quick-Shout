function MessageList({ messages }) {
    return (
        <div className="messages">
            {messages.map((msg, index) => (
                <div key={index} className="message">
                    <b>{msg.username}</b>: {msg.message}
                    <span>{new Date(msg.timestamp * 1000).toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
}

export default MessageList;