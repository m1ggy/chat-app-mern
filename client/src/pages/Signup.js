import { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState({ first: '', last: '' });
  const [showPass, setShowPass] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
    </div>
  );
}

export default Signup;
