package kr.co.tj.fileUpload;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FileUploadRepository extends JpaRepository<FileUploadEntity, String>{
	
	 
}
