import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.css';
import CustomAlert from '../Common';

function FreeBoard() {
  const userId = localStorage.getItem('userId')

  // 게시글 목록 예시 데이터
  const posts = [
    { id: 1, title: "첫 번째 게시글", content: "이것은 첫 번째 게시글입니다.", author: "User1", date: "2024-07-23" },
    { id: 2, title: "두 번째 게시글", content: "이것은 두 번째 게시글입니다.", author: "User2", date: "2024-07-22" },
    { id: 3, title: "세 번째 게시글", content: "이것은 세 번째 게시글입니다.", author: "User3", date: "2024-07-21" },
    { id: 4, title: "네 번째 게시글", content: "이것은 네 번째 게시글입니다.", author: "User4", date: "2024-07-20" },
    { id: 5, title: "다섯 번째 게시글", content: "이것은 다섯 번째 게시글입니다.", author: "User5", date: "2024-07-19" },
    { id: 6, title: "여섯 번째 게시글", content: "이것은 여섯 번째 게시글입니다.", author: "User6", date: "2024-07-18" },
    { id: 7, title: "일곱 번째 게시글", content: "이것은 일곱 번째 게시글입니다.", author: "User7", date: "2024-07-17" },
    { id: 8, title: "여덟 번째 게시글", content: "이것은 여덟 번째 게시글입니다.", author: "User8", date: "2024-07-16" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // 현재 페이지에 보여줄 게시글들 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  function insertBoard(){
    if(userId){
        window.location.href='/freeBoard/insertBoard'
    }else{
        alert("로그인후에 이용해주시기 바랍니다.")
    }
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">자유게시판</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="text-end">
          <Button variant="primary" onClick={insertBoard}>게시글 작성</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {currentPosts.map(post => (
              <ListGroup.Item key={post.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">작성자: {post.author} | 날짜: {post.date}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev 
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)} 
              disabled={currentPage === 1}
            />
            {[...Array(Math.ceil(posts.length / postsPerPage)).keys()].map(number => (
              <Pagination.Item 
                key={number + 1} 
                active={number + 1 === currentPage} 
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next 
              onClick={() => paginate(currentPage < Math.ceil(posts.length / postsPerPage) ? currentPage + 1 : currentPage)} 
              disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default FreeBoard;
