import React, { useEffect, useState } from 'react'; // useEffect는 불필요하므로 삭제
import { Container, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { _DownLoadFile, _Fetch } from '../../NetworkUtils';
import { useParams } from 'react-router-dom';

function FreeBoardDetail() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createDt, setCreateDt] = useState('');
  const [isEditable, setIsEditable] = useState(true);
  const [attflId, setAttflId] = useState([])

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

        _Fetch("GET", `file/findAttflId/${data.attflId}`).then(data2=>{
          setAttflId(data2)
        })
    });
  
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href=`/freeBoard/update/${id}`
  };

  const fn_fileDownLoad = (filePath, fileName) => {
    
    let dto = {
      filePath : filePath,
      fileName : fileName
    };

    _DownLoadFile("POST", `file/downloadFile`, dto)
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">게시글 보기</h1>
      <h5>등록일자 : {createDt}</h5>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {isEditable && (
                <Button type="button" className="btn btn-dark" onClick={handleSubmit}>수정</Button>
            )}
        </div>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="*게시글 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} required readOnly/>
        </Form.Group>

        <ListGroup className="mb-3">
          <Form.Label>첨부파일 (더블클릭시 다운로드됩니다.)</Form.Label>
          {attflId.map((file, index) => (
            <ListGroup.Item
              key={index}
              onDoubleClick={() => fn_fileDownLoad(file.filePath, file.fileName)}
            style={{ cursor: 'pointer' }}
            >
              {file.fileName}
            </ListGroup.Item>
          ))}
        </ListGroup>


        <Form.Group controlId="formContent" className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" rows={13} placeholder="*게시글 내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} required readOnly/>
        </Form.Group>
      
    </Container>
  );
}

export default FreeBoardDetail;
