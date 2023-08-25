import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Signup() {
    const [selectEmail, setSelectEmail] = useState("이메일 선택");
    const [customEmail, setCustomEmail] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);

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

    return (
        <div className='App'>
            <header className="App-header">
                <img src='/assets/LandMaruBig.png' width={600} height={250}/>
            <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text id="basic-addon1" style={{width:"100px"}}>이름</InputGroup.Text>
                    <Form.Control placeholder='*필수' />
                </InputGroup>
                <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text id="basic-addon1" style={{width:"100px"}}>아이디</InputGroup.Text>
                    <Form.Control placeholder='*필수' />
                </InputGroup>
                <InputGroup style={{ width: "500px" }}  className="mb-3">
                    <InputGroup.Text id="basic-addon1" style={{width:"100px"}} >비밀번호</InputGroup.Text>
                    <Form.Control placeholder='*필수' type='password'/>
                </InputGroup>
                <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm" style={{width:"100px"}}>이메일</InputGroup.Text>
                    <Form.Control placeholder='*필수'/>
                    {showCustomInput && <Form.Control placeholder="직접 입력" value={customEmail} onChange={handleCustomEmailChange} />}
                    <DropdownButton variant="outline-secondary" title={selectEmail} id="input-group-dropdown-2" align="end">
                        <Dropdown.Item onClick={() => handleEmailSelect('naver.com')}>naver.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('gmail.com')}>gmail.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('daum.net')}>daum.net</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('nate.com')}>nate.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('직접입력')}>직접입력</Dropdown.Item>
                    </DropdownButton>
                    
                    
                </InputGroup>
                <Button variant="outline-secondary">이메일 발송</Button>
                <p style={{ fontSize: '12px' }}>E-mail 로 발송된 번호를 확인한 후 인증하셔야 회원가입이 완료됩니다.</p>

                <Button variant="outline-success"style={{width:"500px"}} size="lg">가입 완료</Button>
            </header>
        </div>
  )
}

export default Signup