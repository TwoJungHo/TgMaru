package kr.co.tj.email;

import com.sendgrid.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.sendgrid.SendGrid;

@Configuration
public class SendEmailConfig {
	
	@Value("${sendgrid.api.key")
	private String sendEmailApiKey;
	
	@Bean
	public SendGrid sendEmail() {
		return new SendGrid(sendEmailApiKey);
	}
}
