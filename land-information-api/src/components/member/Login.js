import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoginFn } from '../../NetworkUtils';

function Login() {

    localStorage.removeItem("userId")
    const userId = useRef();
    const password = useRef();

    function LoginPush(){
    const dto = {
    userId : userId.current.value.toString(),
    password : password.current.value.toString()
    }

    LoginFn("POST", "http://localhost:8000/user/login", dto)
    }

    return (
        <div className='App'>
            <header className="App-header">
            <img src='/assets/LandMaruBig.png' width={600} height={250} alt=''/>
                <InputGroup style={{ width: "500px" }} className="mb-3">
                    <Form.Control placeholder='아이디' ref={userId}/>
                </InputGroup>
                <InputGroup style={{ width: "500px" }} className="mb-3">
                    <Form.Control placeholder='비밀번호' ref={password}/>
                </InputGroup>
                <Row>
                    <Col>
                        <Button variant="outline-light" onClick={LoginPush}>로그인</Button>
                    </Col>
                    <Col>
                        <Button variant="outline-light" style={{width:'100px'}} href='/Signup' >회원가입</Button>
                    </Col>
                </Row>
                
            </header>
        </div>
    )
}

export default Login;
