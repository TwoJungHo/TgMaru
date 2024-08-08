import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { _Fetch } from '../../NetworkUtils';
import { useParams } from 'react-router-dom';
import { Button } from 'bootstrap';

function MyProfile() {
  const userId = useParams().userId;
  const [userprofile, setUserprofile] = useState();

  useEffect(()=>{
    _Fetch("GET", `user/myprofile/${userId}`)
    .then((data)=>{
      if(data === undefined || data === null){
        alert("사용자의 정보를 불러오는데 실패했습니다.")
      }else{
        setUserprofile(data);
      }
    })
  },[userId])

  const fn_ProfileUpdate = (e) => {
    window.location.href=`/TGmaruProfile/update/${userId}`
  }

  return (
    <div className='App'>
        <header className="App-header">
        <Card text="light" border="light" bg="dark" style={{ height: '30rem', width: '35rem' }}>
      <Card.Header style={{fontSize:30}}>나의 프로필</Card.Header>
      
      <Card.Body >
            <Form>
            <Form.Group as={Row} className="mb-3">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-dark" onClick={fn_ProfileUpdate}>정보수정</button>
            </div>
                <Form.Label column sm="2">
                아이디
                </Form.Label>
                <Col sm="10">
                <Form.Control style={{color:"white"}} plaintext readOnly defaultValue={userId} />
                </Col>

                <Form.Label column sm="2">
                Email
                </Form.Label>
                <Col sm="10">
                <Form.Control style={{color:"white"}} plaintext readOnly defaultValue={userprofile ? userprofile.email : ""}/>
                </Col>

                <Form.Label column sm="2">
                이름
                </Form.Label>
                <Col sm="10">
                <Form.Control style={{color:"white"}} plaintext readOnly defaultValue={userprofile ? userprofile.username : ""} />
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