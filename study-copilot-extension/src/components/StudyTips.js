import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const StudyTips = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Function to fetch initial messages or chat history
    const fetchMessages = async () => {
      try {
        const response = await axios.get('api/chat/history');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchMessages();
  }, []);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post('api/chat/send', { message: inputText });
      setMessages([...messages, response.data]);
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <Button onClick={toggleChat}>Open Chat</Button>
      <Modal isOpen={chatOpen} toggle={toggleChat}>
        <ModalHeader>Study Copilot Chat</ModalHeader>
        <ModalBody>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
          <input type="text" value={inputText} onChange={handleInputChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={sendMessage}>Send</Button>
          <Button color="secondary" onClick={toggleChat}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StudyTips;