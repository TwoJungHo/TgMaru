package kr.co.tj.email;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.user.UserService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/emailAuth")
@AllArgsConstructor
public class EmailController {

	private EmailService emailService;
	private UserService userService;
	
	@PostMapping("/email")
	public ResponseEntity<?> sendMail(@RequestBody EmailRequest emailRequest){
		
		boolean trueOrFalse = userService.findByEmail(emailRequest.getEmail());
		
		if(trueOrFalse == true) {
			return ResponseEntity.badRequest().body("이미 해당 이메일로 인증이 되어있습니다.");
		}
		
		String send = emailService.sendEmail(emailRequest.getEmail());
		
		return ResponseEntity.ok().body(send);
	}
}
