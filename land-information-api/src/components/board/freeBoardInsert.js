import React, { useState, useEffect } from 'react'; // React와 useEffect를 임포트합니다.
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { _Fetch } from '../../NetworkUtils';

function FreeBoardInsert() { // 컴포넌트 이름을 대문자로 변경

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    
    if(title===null || title==="" || content===null || content===""){
        alert("제목과 내용은 필수입력사항입니다")
        
    }else{
        const param = {
            title : title,
            content : content,
        };

        console.log(param)
        
        _Fetch("GET", `board/insertBoard/`, param).then(data=>{

        });
    }
   

  };

  return (
    
    <Container className="mt-5">
      <h1 className="text-center mb-4">게시글 작성</h1>
      
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button type="button" className="btn btn-dark" onClick={handleSubmit}>저장</Button>
        </div>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="*게시글 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </Form.Group>
        <Form.Group controlId="formContent" className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={15} placeholder="*게시글 내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} required/>
        </Form.Group>
      
    </Container>
    
  );
}

export default FreeBoardInsert;
