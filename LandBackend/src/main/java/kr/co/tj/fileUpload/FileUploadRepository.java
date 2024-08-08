package kr.co.tj.fileUpload;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FileUploadRepository extends JpaRepository<FileUploadEntity, Long>{

	
	@Query(value = "SELECT A.filePath, A.fileName, A.id FROM File A WHERE A.attflId = :attflId ORDER BY A.id", nativeQuery = true)
	List<Map<String, Object>> findByFileList(String attflId);
	
	 
}
