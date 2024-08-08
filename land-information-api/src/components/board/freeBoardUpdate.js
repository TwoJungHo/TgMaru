import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from 'react-router-dom';
import { _Fetch } from '../../NetworkUtils';

function FreeBoardUpdate() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [attflId, setAttflId] = useState('');
    const id = useParams().id


    useEffect(()=> {

      _Fetch("GET", `freeboard/getDetail/${id}`).then(data=>{
        console.log(data)
        setAttflId(data.attflId)
        setTitle(data.title);
        setContent(data.content)
      });
    },[]);

    

  const fn_saveFreeBoard = (e) =>{
    e.preventDefault();

    if (!title || !content) {
      alert("제목과 내용은 필수입력사항입니다");
    } else {
        const param = {
            id : id,
            title : title,
            content : content,
            userId : localStorage.getItem("userId"),
            attflId : attflId
        }

        console.log(param)
      _Fetch("POST","freeboard/update", param).then(data =>{
        if(data){
          alert("수정되었습니다.")
          window.location.href = "/freeBoard"
        }else{
          alert("서버와의 통신에 실패했습니다. \n 잠시후 다시 시도해주세요") 
          }
      })
    }
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">게시글 수정</h1>
      
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button type="button" className="btn btn-dark" onClick={fn_saveFreeBoard}>저장</Button>
        </div>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="*게시글 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formContent" className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={15} placeholder="*게시글 내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)}/>
        </Form.Group>
        
    </Container>
  )
}

export default FreeBoardUpdate
