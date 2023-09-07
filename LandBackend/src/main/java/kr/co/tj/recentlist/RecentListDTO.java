package kr.co.tj.recentlist;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecentListDTO {
	
	private String id;
	
	private String userId;
	
	private String address;
	
	private Date createat;

}
