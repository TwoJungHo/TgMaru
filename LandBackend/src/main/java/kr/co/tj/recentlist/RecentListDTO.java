package kr.co.tj.recentlist;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Component
public class RecentListDTO {
	
	private String id;
	
	private String userId;
	
	private String address;
	
	private Date createat;

}
