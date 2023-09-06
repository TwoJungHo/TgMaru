package kr.co.tj.user;


import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
	
	private UserRepository userRepository;
	
	public boolean findByEmail(String email) {
		
		UserEntity entity = userRepository.findByEmail(email);
		
		if(entity==null) {
			return false;
		}
		return true;
	}

	public UserEntity UserSignUp(UserDTO dto) {
	    UserEntity entity = userRepository.findByEmail(dto.getEmail());
	    
	    if (entity == null) {
	        entity = UserEntity.builder()
	            .userId(dto.getUserId())
	            .username(dto.getUsername())
	            .password(dto.getPassword())
	            .email(dto.getEmail())
	            .build();

	        entity = userRepository.save(entity);
	        return entity;
	    }
	    return null;
	}


}
