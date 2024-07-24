import React, { useEffect, useState } from 'react'; // useEffect는 불필요하므로 삭제
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { _Fetch } from '../../NetworkUtils';
import { useParams } from 'react-router-dom';

function FreeBoardDetail() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createDt, setCreateDt] = useState('');
  const [isEditable, setIsEditable] = useState(true);
  const id = useParams().id
  const author = useParams().author

  useEffect(()=> {
    
    if(author === localStorage.getItem("userId")){
        setIsEditable(true)
    }else{
        setIsEditable(false)
    };

    _Fetch("GET", `freeboard/getDetail/${id}`).then(data=>{
        setTitle(data.title);
        setContent(data.content)
        setCreateDt(data.createDate)
    });
  
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용은 필수입력사항입니다");
    } else {
        const param = {
            id : id,
            title : title,
            content : content,
            userId : localStorage.getItem("userId"),
        }
      _Fetch("POST","freeboard/update", param)
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">게시글 보기/수정</h1>
      <h5>등록일자 : {createDt}</h5>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {isEditable && (
                <Button type="button" className="btn btn-dark" onClick={handleSubmit}>저장</Button>
            )}
        </div>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="*게시글 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} required readOnly={!isEditable}/>
        </Form.Group>
        <Form.Group controlId="formContent" className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={13} placeholder="*게시글 내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} required readOnly={!isEditable}/>
        </Form.Group>
      
    </Container>
  );
}

export default FreeBoardDetail;
