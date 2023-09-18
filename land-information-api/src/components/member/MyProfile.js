import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function MyProfile() {

  return (
    <div className='App'>
        <header className="App-header">
        <Card text="light" border="light" bg="dark" style={{ height: '30rem', width: '35rem' }}>
      <Card.Header style={{fontSize:30}}>나의 프로필</Card.Header>
      <Card.Body >
            <Form>
            <Form.Group as={Row} className="mb-3">

                <Form.Label column sm="2">
                아이디
                </Form.Label>
                <Col sm="10">
                <Form.Control style={{color:"white"}} plaintext readOnly defaultValue={localStorage.getItem("userId")} />
                </Col>

                <Form.Label column sm="2">
                Email
                </Form.Label>
                <Col sm="10">
                <Form.Control style={{color:"white"}} plaintext readOnly defaultValue="이메일 들어올자리" />
                </Col>

                <Form.Label column sm="2">
                이름
                </Form.Label>
                <Col sm="10">
                <Form.Control style={{color:"white"}} plaintext readOnly defaultValue="이름 들어올자리" />
                </Col>

               
                <Form.Label column sm="2">
                비밀번호
                </Form.Label>
                <Col sm="10">
                <Form.Control style={{color:"white"}} plaintext readOnly defaultValue="수정 버튼 들어올자리" />
                </Col>
            </Form.Group>
          </Form>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
        </header>
        </div>
  )
}

export default MyProfile