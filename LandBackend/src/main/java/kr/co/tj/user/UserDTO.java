package kr.co.tj.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

	private String userId;
	
	private String username;
	
	private String password;
	
	private String email;
}
