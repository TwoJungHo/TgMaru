package kr.co.tj.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

	@Id
	@Column(nullable = false, unique = true)
	private String userId;
	
	private String username;
	
	private String password;
	
	private String email;
	
	
}
