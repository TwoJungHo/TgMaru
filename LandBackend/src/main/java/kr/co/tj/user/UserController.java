package kr.co.tj.user;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
	
	@GetMapping("/myprofile/{userId}")
	public ResponseEntity<UserDTO> MyProfile(@PathVariable("userId") String userId){
		
		if(userId == null) {
			return null;
		}
		
		if(userId == "") {
			return null;
		}
		
		UserDTO dto = userService.findByUserprofile(userId);
		
		if(dto == null) {
			return null;
		}
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping("/test")
	public ResponseEntity<List<String>> test(){
		
		List<String> list = new ArrayList<>();
		
		list.add("11111");
		list.add("22222");
		list.add("33333");
		list.add("4444");
		list.add("55555");
		list.add("666");
		list.add("77");
		list.add("88");
		list.add("99");
		list.add("aa");
		list.add("ss");
		list.add("dd");
		list.add("ff");
		list.add("gg");
		
		return ResponseEntity.ok().body(list);
	}
}
