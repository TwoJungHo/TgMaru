package kr.co.tj.email;

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
	
	@PostMapping("/send-email")
	public String sendEmail(@RequestBody EmailRequest emailRequest) {
		
		try {
			emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getText());
			return "Email sent successfully";
		} catch (Exception e) {
			return "Error sending email: " + e.getMessage();
		}
	}
}
