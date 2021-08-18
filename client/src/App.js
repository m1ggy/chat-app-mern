import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState();
  useEffect(() => {
    setSocket(io('localhost:8888'));
  }, []);

  return null;
}

export default App;
