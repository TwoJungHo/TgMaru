import React, { useState, useEffect } from 'react'; // React와 useEffect를 임포트합니다.
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { _Fetch } from '../../NetworkUtils';
import FileUpload from '../FileUpload';

function FreeBoardInsert() { // 컴포넌트 이름을 대문자로 변경

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attflId, setAttflId] = useState(null);

  const handleSubmit = (e) => {
    
    if(title===null || title==="" || content===null || content===""){
        alert("제목과 내용은 필수입력사항입니다")
        
    }else{
        const param = {
            "title" : title,
            "content" : content,
            "userId" : localStorage.getItem("userId"),
            "attflId" : attflId
        };
        
        _Fetch("POST", `freeboard/insert`, param).then(data=>{
          if(data){
            alert("성공적으로 등록되었습니다.")
            window.location.href = "/freeBoard"
          }else{
            alert("서버와의 통신에 실패했습니다. \n 잠시후 다시 시도해주세요")
          }
        });
    }
   

  };

  const handleUploadSuccess = (data) => {
    setAttflId(data); // 파일 업로드 성공 시 첨부파일ID 저장
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
        <FileUpload onUploadSuccess={handleUploadSuccess}/>


        <Form.Group controlId="formContent" className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={15} placeholder="*게시글 내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} required/>
        </Form.Group>
        
    </Container>
    
  );
}

export default FreeBoardInsert;
