import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

function ChatTravelAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([]);

    const askQuestion = async () => {
        if (!question.trim()) return; 

        console.log("Sending question:", question); 

        const apiUrl = 'https://146.235.233.3/ask';
        try {
            const response = await axios.post(apiUrl, { question });
            console.log("Received response:", response.data); 

            setMessages([...messages, { text: question, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
        } catch (error) {
            console.error('Error while fetching response:', error);
        }
        setQuestion('');
    };

    return (
        <div className="chat-widget">
            <button onClick={() => setIsOpen(!isOpen)} className="chat-button">
                {isOpen ? 'Close Chat' : 'Chat with Us'}
            </button>

            {isOpen && (
                <div className="chat-container">
                    <div className="messages">
                        {messages.map((message, index) => (
                            <div key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <textarea
                        className="chat-textarea"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your question here..."
                    />
                    <button className="send-button" onClick={askQuestion}>Send</button>
                </div>
            )}
        </div>
    );
}

export default ChatTravelAI;