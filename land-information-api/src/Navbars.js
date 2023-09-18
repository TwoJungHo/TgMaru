import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react';

function Navbars() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    const userId = localStorage.getItem('userId');
  if(userId){
    setIsLoggedIn(true);
  }
  },[])

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src='/assets/LandMaru.png' width={100} height={100} alt=''/>
        </Navbar.Brand>
        <Nav className="me-auto" style={{fontSize:"25px"}}>
            <Nav.Link href="https://www.eais.go.kr/" target='_blank'>세움터</Nav.Link>
            <Nav.Link href="http://www.eum.go.kr/web/am/amMain.jsp" target='_blank'>토지이음</Nav.Link>
            <Nav.Link href="http://www.gov.kr" target='_blank'>정부24</Nav.Link>
            <Nav.Link href="http://www.iros.go.kr/PMainJ.jsp" target='_blank'>인터넷등기소</Nav.Link>
          </Nav>
        <Navbar.Toggle />

        {isLoggedIn?(
        <Navbar.Collapse className="justify-content-end">
        <Nav>
            <Nav.Link href="/login">로그아웃</Nav.Link>
            <Nav.Link href={`/TGmaruProfile/${localStorage.getItem('userId')}`}>나의 정보</Nav.Link>
          </Nav>
        
      </Navbar.Collapse>
        ):
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="/login" style={{fontSize:"25px"}}>로그인</a>
          </Navbar.Text>
          
        </Navbar.Collapse>
        }
        
      </Container>
    </Navbar>
  );
}

export default Navbars;