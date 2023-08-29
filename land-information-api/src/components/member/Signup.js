import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

function Signup() {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);

    const [selectEmail, setSelectEmail] = useState("이메일 선택");
    const [customEmail, setCustomEmail] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [email, setEmail] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordMatch(event.target.value === password2);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
        setPasswordMatch(event.target.value === password);
    };

    const handleEmailSelect = (email) => {
        if (email === '직접입력') {
            setShowCustomInput(true);
            setSelectEmail(email);
        } else {
            setShowCustomInput(false);
            setSelectEmail(email);
        }
    };

    const handleCustomEmailChange = (event) => {
        setCustomEmail(event.target.value);
    };

    const EmailPush = () => {
        setEmail(true);
    }

    const EmailAuth = () => {
        setEmail(false);
    }

    return (
        <div className='App'>
            <header className="App-header">
                <img src='/assets/LandMaruBig.png' width={600} height={250}/>
            <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text style={{width:"120px"}}>이름</InputGroup.Text>
                    <Form.Control id="username"  placeholder='*필수' />
                </InputGroup>

                <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text style={{width:"120px"}}>아이디</InputGroup.Text>
                    <Form.Control id="id_name" placeholder='*필수' />
                </InputGroup>

                <InputGroup style={{ width: "500px" }}  className="mb-3">
                    <InputGroup.Text style={{width:"120px"}} >비밀번호</InputGroup.Text>
                    <Form.Control id="password" placeholder='*필수' type='password' value={password} onChange={handlePasswordChange} />
                    {passwordMatch ? <FiCheckCircle style={{ color: 'green', marginLeft: '10px' }} /> : <FiXCircle style={{ color: 'red', marginLeft: '10px' }} />}
                </InputGroup>

                <InputGroup style={{ width: "500px" }}  className="mb-3">
                    <InputGroup.Text style={{width:"120px"}} >비밀번호확인</InputGroup.Text>
                    <Form.Control id="password2" placeholder='*필수' type='password' value={password2} onChange={handlePassword2Change} />
                    {passwordMatch ? <FiCheckCircle style={{ color: 'green', marginLeft: '10px' }} /> : <FiXCircle style={{ color: 'red', marginLeft: '10px' }} />}
                </InputGroup>
                
                <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text style={{width:"120px"}}>이메일</InputGroup.Text>
                    <Form.Control id="email" placeholder='*필수'/>
                    {showCustomInput && <Form.Control placeholder="직접 입력" value={customEmail} onChange={handleCustomEmailChange} />}
                    <DropdownButton variant="outline-secondary" title={selectEmail} id="input-group-dropdown-2" align="end">
                        <Dropdown.Item onClick={() => handleEmailSelect('naver.com')}>naver.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('gmail.com')}>gmail.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('daum.net')}>daum.net</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('nate.com')}>nate.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('직접입력')}>직접입력</Dropdown.Item>
                    </DropdownButton>
                    
                    
                </InputGroup>
                {email === false ? (
                    <Button variant="outline-secondary" onClick={()=> EmailPush()}>이메일 발송</Button>
                 ):<>
                 <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text id="emailCode" style={{ width: "120px" }}>인증번호</InputGroup.Text>
                    <Form.Control placeholder='메일로 발송된 인증번호를 적어주세요' />
                 </InputGroup>
                 <Button variant="outline-secondary" onClick={() => EmailAuth()}>이메일 인증</Button></>
                 }
                <p style={{ fontSize: '12px' }}>E-mail 로 발송된 번호를 확인한 후 인증하셔야 회원가입이 완료됩니다.</p>

                <Button variant="outline-success"style={{width:"500px"}} size="lg">가입 완료</Button>
            </header>
        </div>
  )
}

export default Signup