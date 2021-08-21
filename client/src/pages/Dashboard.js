import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { useStore } from '../hooks/useStore';
function Dashboard() {
  const user = useStore();
  return (
    <>
      <Row>
        <Col>
          <Row>
            <p></p>
            <h1>Chats</h1>
            <Button>Signout</Button>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default Dashboard;
