package kr.co.tj.email;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/emailAuth")
@AllArgsConstructor
public class EmailController {

	private EmailService emailService;
	
	@PostMapping("/email")
	public ResponseEntity<?> sendMail(@RequestBody EmailRequest emailRequest){
		
		System.out.println(emailRequest.getEmail());
		
		String send = emailService.sendEmail(emailRequest.getEmail());
		
		return null;
	}
}
