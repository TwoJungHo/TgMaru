package kr.co.tj.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

	private UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> SignUp(@RequestBody UserDTO dto){
		System.out.println(dto);
		if(dto==null) {
			return ResponseEntity.badRequest().body("dto가 null");
		}
		
		UserEntity entity = userService.UserSignUp(dto);
		
		return ResponseEntity.ok().body(entity);
	}
}
