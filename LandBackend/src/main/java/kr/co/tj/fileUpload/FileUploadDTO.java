package kr.co.tj.fileUpload;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileUploadDTO {

	
	private Long id;

    private String attflId;
    
    private String fileName;
	
	private String filePath;
	
	private int seq;
	
	private String useYn;
	
	private Date createDate;
}
