package kr.co.tj.user;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
		if(dto==null) {
			return ResponseEntity.badRequest().body("dto가 null");
		}
		
		UserEntity entity = userService.UserSignUp(dto);
		
		if(entity == null) {
			return ResponseEntity.badRequest().body("이미 있는 유저");
		}
		System.out.println(entity.getUsername());
		
		return ResponseEntity.ok().body(entity);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserDTO> Login(@RequestBody UserDTO dto){
		if(dto.getUserId() == null && dto.getPassword()==null) {
			return ResponseEntity.badRequest().body(dto);
		}
		dto = userService.Login(dto);
		
		if(dto == null) {
			return ResponseEntity.badRequest().body(dto);
		}
		
		return ResponseEntity.ok().body(dto);
	}
}
