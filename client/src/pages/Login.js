import { useState } from 'react';
import { Card, Col, Row, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, message, setMessage } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <Col
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Row>
        <Card
          as='form'
          onSubmit={handleSubmit}
          style={{
            width: '25vw',
            minHeight: 'max-content',
            textAlign: 'center',
            minWidth: '350px',
          }}
        >
          <Card.Body>
            <Col>
              <Row style={{ minHeight: 'max-content', height: '50px' }}>
                <Card.Title>Login</Card.Title>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                {' '}
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </Form.Group>
              </Row>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '20px',
                }}
              >
                <Button type='submit' style={{ width: '100px' }}>
                  Login
                </Button>
              </Row>
              <Row>
                <p>
                  Need an Account? <Link to='/signup'>Signup.</Link>
                </p>
              </Row>
            </Col>
          </Card.Body>
        </Card>
      </Row>
      <Row style={{ minHeight: '150px' }}>
        {message.show && (
          <Alert
            style={{ height: 'max-content', marginTop: '25px' }}
            dismissible
            show={message.show}
            onClose={() => {
              setMessage({ ...message, show: false });
            }}
            variant={message.variant}
          >
            {message.content}
          </Alert>
        )}
      </Row>
    </Col>
  );
}

export default Login;
