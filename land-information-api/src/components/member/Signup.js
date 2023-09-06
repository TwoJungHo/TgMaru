import React, { useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { SendEmailFN, SignUpFn } from '../../NetworkUtils';

function Signup() {
    const username = useRef(); //유저 이름
    const userId = useRef();   // 유저 아이디
    const [password, setPassword] = useState(""); // 유저 패스워드
    const [password2, setPassword2] = useState(""); // 패스워드 일치 확인용
    const [FinEmail, setFinEmail] = useState("");

    const [passwordMatch, setPasswordMatch] = useState(false); // 패스워드 일치 확인 true false
    const [email, setEmail] = useState(""); // 이메일 앞부분
    const [emailAuthNumber, setEmailAuthNumber] = useState(""); // 발송된 이메일 인증번호
    const emailAuthNumber1= useRef(); // 이메일 인증번호 확인

    const [selectEmail, setSelectEmail] = useState("이메일 선택");
    const [customEmail, setCustomEmail] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const [emailAuthFin, setEmailAuthFin] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordMatch(event.target.value === password2);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
        setPasswordMatch(event.target.value === password);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleEmailSelect = (emailStatus) => {
        if (emailStatus === '직접입력') {
            setShowCustomInput(true);
            setSelectEmail(emailStatus);
        } else {
            setShowCustomInput(false);
            setCustomEmail(emailStatus);
            setSelectEmail(emailStatus);
        }
    };

    const handleCustomEmailChange = (event) => {
        setCustomEmail(event.target.value);
    };

    const EmailPush = () => {
        if(password !== password2){
        alert("패스워드가 일치하지 않습니다.")
        }else{
            const dto = {
                email : email+"@"+customEmail
            }
            SendEmailFN("POST", "http://localhost:8000/emailAuth/email", dto)
            .then((result) =>{
                setEmailAuthNumber(result);
            })
            setEmailStatus(true);
        }
    }

    const EmailAuth = () => {
        if(emailAuthNumber.toString() !== emailAuthNumber1.current.value.toString()){
        alert("인증번호가 일치하지 않습니다!")
        } else{
        alert("인증이 완료 되었습니다.")
        setEmailAuthFin(true);
        setFinEmail(email+"@"+customEmail)
        }
    }

    function SignUpButton(){
        if(password !== password2 || emailAuthFin === false){
            alert("이메일 인증이 완료되지 않았거나, 패스워드가 일치하지않습니다.")
        } else{
            const dto = {
                userId : userId.current.value.toString(),
                username : username.current.value.toString(),
                password : password,
                email : FinEmail
            }
            SignUpFn("POST", `http://localhost:8000/user/signup`,dto)
        }
    }

    return (
        <div className='App'>
            <header className="App-header">
                <img src='/assets/LandMaruBig.png' width={600} height={250} alt=''/>
            <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text style={{width:"120px"}}>이름</InputGroup.Text>
                    <Form.Control id="username"  placeholder='*필수' ref={username}/>
                </InputGroup>

                <InputGroup style={{ width: "500px" }} className="mb-3">
                    <InputGroup.Text style={{width:"120px"}}>아이디</InputGroup.Text>
                    <Form.Control id="id_name" placeholder='*필수' ref={userId}/>
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
                    <Form.Control id="email" placeholder='*필수' value={email} onChange={handleEmailChange}/>
                    {showCustomInput && <Form.Control placeholder="직접 입력" value={customEmail} onChange={handleCustomEmailChange} />}
                    <DropdownButton variant="outline-secondary" title={selectEmail} id="input-group-dropdown-2" align="end">
                        <Dropdown.Item onClick={() => handleEmailSelect('naver.com')}>naver.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('gmail.com')}>gmail.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('daum.net')}>daum.net</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('nate.com')}>nate.com</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleEmailSelect('직접입력')}>직접입력</Dropdown.Item>
                    </DropdownButton>
                    
                    
                </InputGroup>
                {emailStatus === false ? (
                    <Button variant="outline-secondary" onClick={()=> EmailPush()}>이메일 발송</Button>
                 ):<>
                 
                 {emailAuthFin === false ? (
                 <><InputGroup style={{ width: "500px" }} className="mb-3">
                                <InputGroup.Text id="emailCode" style={{ width: "120px" }}>인증번호</InputGroup.Text>
                                <Form.Control placeholder='메일로 발송된 인증번호를 적어주세요' ref={emailAuthNumber1} />
                            </InputGroup><Button variant="outline-secondary" onClick={() => EmailAuth()}>이메일 인증</Button></>
                 ):<Button variant="secondary" size="lg" disabled>인증완료</Button>}
                 </>
                 }
                <p style={{ fontSize: '12px' }}>E-mail 로 발송된 번호를 확인한 후 인증하셔야 회원가입이 완료됩니다.</p>

                <Button variant="outline-success"style={{width:"500px"}} size="lg" onClick={SignUpButton}>가입 완료</Button>
            </header>
        </div>
  )
}

export default Signup