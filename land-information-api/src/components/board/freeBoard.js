import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { _Fetch } from '../../NetworkUtils';

function FreeBoard() {
  const userId = localStorage.getItem('userId')
  const [posts, setPosts] = useState([]);
  const [searchType, setSearchType] = useState(0);
  const [searchValue, setSearchValue] = useState(null);


  useEffect(()=> {
    
    _Fetch("GET","freeboard/select").then(data=>{
      setPosts(data)
    })
  
  },[]);
  

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
  };

  const fn_search = ()=> {
    _Fetch("GET", `freeboard/searchBoard/${searchType}/${searchValue}`)
    .then((data)=>{
      setPosts(data)
    })
  }

  const fn_detail = (id, author) =>{
    window.location.href=`/freeBoard/detail/${id}/${author}`
  };

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
                    <Card.Subtitle className="mb-2 text-muted">작성자: {post.author} | 등록일자: {post.date}</Card.Subtitle>
                    <a className="btn btn-primary" onClick={()=>fn_detail(post.id, post.userId)}>자세히보기</a>
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
      <div style={{textAlign:'center'}}>
        <select name='searchValue' onChange={(event)=> setSearchType(event.target.value)}>
          <option value={0}>제목 + 내용</option>
          <option value={1}>작성자</option>
        </select>
        <input type='text' onChange={(event) => setSearchValue(event.target.value)}/>
        <button onClick={fn_search}>조회</button>
        </div>
        
      
    </Container>
  );
}

export default FreeBoard;
