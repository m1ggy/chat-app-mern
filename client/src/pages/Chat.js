import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { useStore } from '../hooks/useStore';
import useAuth from '../hooks/useAuth';
function Chat() {
  const user = useStore((state) => state.user);
  const { signout } = useAuth();
  useEffect(() => {
    const socket = io('http://localhost:8888');
    socket.on('connect', () => {
      console.log('connected');
    });
  }, []);
  return (
    <Row
      style={{
        width: '100vw',
        margin: 25,
      }}
    >
      <Col className='border'>
        <Row>
          {' '}
          <Button
            variant='danger'
            style={{ minWidth: '125px', width: '50%', margin: 25 }}
            onClick={signout}
          >
            Sign out
          </Button>
        </Row>
        <Row style={{ height: '125px' }}>
          <p>Welcome, {user.fName}!</p>

          <h1>Chats</h1>
        </Row>
        <Row>
          {user.conversations.length === 0 ? (
            <p>No Conversations</p>
          ) : (
            user.conversations.map((conversation) => {
              return <p>{conversation}</p>;
            })
          )}
        </Row>
      </Col>
      <Col lg={10}></Col>
    </Row>
  );
}

export default Chat;
