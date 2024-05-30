import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Gpt4 = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (inputText.trim() === '') {
      return;
    }

    const newMessage = {
      text: inputText,
      sender: 'user',
    };

    setChatHistory([...chatHistory, newMessage]);
    setInputText('');
    setIsLoading(true);

    axios.post('your-gpt4-api-endpoint', {
      message: inputText,
    }).then(response => {
      const botMessage = {
        text: response.data.message,
        sender: 'bot',
      };

      setChatHistory([...chatHistory, botMessage]);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error sending message to GPT-4:', error);
      setIsLoading(false);
    });
  };

  return (
    <div>
      <div>
        {
          chatHistory.map((message, index) => (
            <div key={index}>
              <p>{message.text}</p>
            </div>
          ))
        }
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={sendMessage} disabled={isLoading}>
        Send
      </button>
    </div>
  );
};

export default Gpt4;