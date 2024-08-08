import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { _Fetch } from '../../NetworkUtils';

function ProfileUpdate() {
    const userId = useParams().userId;
  const [formData, setFormData] = useState({
    userId: userId,
    username: '',
    email: '',
    password: '',
    changePassword: '',
  });

  useEffect((e)=>{
    
    _Fetch("GET", `user/myprofile/${userId}`).then(data=>{
        if(data === undefined || data === null){
            alert("사용자의 정보를 불러오는데 실패했습니다.")
          }else{
            setFormData(prevState => ({
                ...prevState,
                email: data.email,
                username: data.username
              }));
          }
    })
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    _Fetch("POST", "user/updateUser", formData).then(data=>{
        
        if(data){
            alert("변경되었습니다.")
            window.location.href=`/TGmaruProfile/${userId}`
        }else{
            alert("비밀번호가 일치하지 않습니다.")
        }
    })

  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="mb-4">회원정보 수정</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>아이디(변경불가)</Form.Label>
              <Form.Control type="text" value={formData.userId} readOnly/>
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>이름(닉네임)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>이메일(변경불가)</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                required
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="현재 비밀번호를 입력해주세요"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>변경 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="변경할 비밀번호를 입력해주세요"
                name="changePassword"
                value={formData.changePassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              변경
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileUpdate;
