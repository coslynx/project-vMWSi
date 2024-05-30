import React, { useState, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import axios from 'axios';

const ChatPopup = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Function to handle user input and send request to GPT-4 API
    const handleUserInput = async () => {
      try {
        const response = await axios.post('GPT-4-API-URL', { inputText });
        const responseData = response.data;
        
        setChatHistory(prevChatHistory => [...prevChatHistory, { text: inputText, type: 'user' }]);
        setChatHistory(prevChatHistory => [...prevChatHistory, { text: responseData, type: 'bot' }]);
      } catch (error) {
        console.error('Error processing chat input:', error);
      }
    };

    // Mock function to simulate GPT-4 API response
    const mockGPT4Response = (input) => {
      return `Mock response for: ${input}`;
    };

    // Function to handle user submit
    const handleUserSubmit = () => {
      setChatHistory(prevChatHistory => [...prevChatHistory, { text: inputText, type: 'user' }]);
      setChatHistory(prevChatHistory => [...prevChatHistory, { text: mockGPT4Response(inputText), type: 'bot' }]);
      setInputText('');
    };

    // Event listener for Enter key press
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleUserSubmit();
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [inputText]);

  return (
    <div>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ textAlign: chat.type === 'user' ? 'right' : 'left' }}>
            {chat.type === 'user' ? (
              <p style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>{chat.text}</p>
            ) : (
              <p style={{ backgroundColor: '#007bff', color: 'white', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>{chat.text}</p>
            )}
          </div>
        ))}
      </div>
      <Input
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button color="primary" onClick={handleUserSubmit}>Send</Button>
    </div>
  );
};

export default ChatPopup;