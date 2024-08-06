import React, { useState } from 'react';
import { FileUploadFetch } from '../NetworkUtils';

function FileUpload({ onUploadSuccess }) {
    const [files, setFiles] = useState([]);
    
    const handleFileChange = (event) => {
        setFiles(event.target.files);

        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //let attflIdData = []
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            //attflIdData.push(files[i])
            formData.append('files', files[i]);
        }

        
        FileUploadFetch("POST", "file/upload", formData).then(data=>{
            if(data){
                onUploadSuccess(data.attflid); // 업로드 성공 시 콜백 호출
            }else{
                alert("서버와의 통신에 실패했습니다. \n 잠시후 다시 시도해주세요")
              }
        })
        

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" multiple onChange={handleFileChange} />
                <button type="submit">파일등록</button>
                <span  style={{color:"red", fontSize:"13px"}}> 첨부파일 등록후 파일등록을 눌러주세요</span>
            </form>
        </div>
    );
}

export default FileUpload;
