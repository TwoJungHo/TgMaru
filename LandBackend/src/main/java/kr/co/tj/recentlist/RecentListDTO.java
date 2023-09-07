package kr.co.tj.recentlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecentListDTO {
	
	private Long id;
	
	private String userId;
	
	private String address;
}
