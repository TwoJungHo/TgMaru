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

}
