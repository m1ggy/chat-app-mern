import { useState } from 'react';
import { Card, Col, Row, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState({ first: '', last: '' });
  const [showPass, setShowPass] = useState(false);
  const { message, setMessage, signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    signup({ email, password, name });
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
                <Card.Title>Signup</Card.Title>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={name.first}
                    onChange={({ target }) =>
                      setName((old) => {
                        return { ...old, first: target.value };
                      })
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    value={name.last}
                    onChange={({ target }) =>
                      setName((old) => {
                        return { ...old, last: target.value };
                      })
                    }
                  />
                </Form.Group>
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
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </Form.Group>
              </Row>
              <Row style={{ margin: '20px' }}>
                {password.length !== 0 &&
                  (showPass ? (
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPass(false)}
                    >
                      Hide password 🔑
                    </p>
                  ) : (
                    <p
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPass(true)}
                    >
                      Show password 👀
                    </p>
                  ))}
              </Row>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '20px',
                }}
              >
                <Button type='submit' style={{ width: '150px' }}>
                  Create account
                </Button>
              </Row>
              <Row>
                <p>
                  Already have an account? <Link to='/'>Sign in.</Link>
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

export default Signup;
