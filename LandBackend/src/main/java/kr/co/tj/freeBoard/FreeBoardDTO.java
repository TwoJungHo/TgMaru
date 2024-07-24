package kr.co.tj.freeBoard;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FreeBoardDTO {
	
	private String userId;
	
	private String title;
	
	private String content;
	
	private Date createDate;
	
	private Date modifyDate;
}
