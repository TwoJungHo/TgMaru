package kr.co.tj.user;


import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
	
	private UserRepository userRepository;
	private BCryptPasswordEncoder passwordEncoder;
	
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
	    	String encPassword = passwordEncoder.encode(dto.getPassword());
	    	
	        entity = UserEntity.builder()
	            .userId(dto.getUserId())
	            .username(dto.getUsername())
	            .password(encPassword)
	            .email(dto.getEmail())
	            .build();

	        entity = userRepository.save(entity);
	        return entity;
	    }
	    return null;
	}

	public UserDTO Login(UserDTO dto) {
		
		Optional<UserEntity> optional= userRepository.findById(dto.getUserId());
		UserEntity entity = optional.get();
		
		if(entity == null) {
			return null;
		}
		
		if(!passwordEncoder.matches(dto.getPassword(), entity.getPassword())) {
			return null;
		}
		
		dto = UserDTO.builder()
				.email(entity.getEmail())
				.userId(entity.getUserId())
				.username(entity.getUsername())
				.password(entity.getPassword())
				.build();
		
		return dto;
	}

	public UserDTO findByUserprofile(String userId) {
		
		Optional<UserEntity> optional = userRepository.findById(userId);
		
		if(optional.isEmpty()) {
			return null;
		}
		
		UserEntity entity = optional.get();
		
		UserDTO dto = UserDTO.builder()
		.userId(entity.getUserId())
		.username(entity.getUsername())
		.email(entity.getEmail())
		.password(entity.getPassword())
		.build();
		
		return dto;
	}

	public boolean UpdateUser(Map<String, String> map) {
		
		String email = map.get("email");
		UserEntity entity = userRepository.findByEmail(email);
		
		String originPassword = entity.getPassword();
		String originInputPassword = map.get("password");
		
		boolean isMatched = passwordEncoder.matches(originInputPassword, originPassword);
		
		if(isMatched) {
			
			UserEntity changeEntity = UserEntity.builder()
			.userId(map.get("userId"))
			.username(map.get("username"))
			.password(passwordEncoder.encode(map.get("changePassword")))
			.email(map.get("email"))
			.build();
			
			userRepository.save(changeEntity);
		}else {
			return false;
		}
		return true;
	}


}
