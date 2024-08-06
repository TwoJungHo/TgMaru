package kr.co.tj.fileUpload;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "file")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileUploadEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String attflId; // 파일 그룹을 식별할 필드
	
    private String fileName;
    
	private String filePath;
	
	private int seq;
	
	private String useYn;
	
	private Date createDate;
	
}
