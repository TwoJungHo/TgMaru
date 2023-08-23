package kr.co.tj.email;

import org.springframework.stereotype.Service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {
	private SendGrid sendGrid;
	
	public void sendEmail(String to, String subject, String text) throws Exception{
		Email from = new Email("www.naver.com"); // 보내는 사람 이메일 주소
		Email toEmail = new Email(to);
		Content content = new Content("text/plain", text);
		Mail mail = new Mail(from, subject, toEmail, content);
		
		Request request = new Request();
		
		try {
			request.setMethod(Method.POST);
			request.setEndpoint("mail/send");
			request.setBody(mail.build());
			
			Response response = sendGrid.api(request);
			
			if(response.getStatusCode() >=200 && response.getStatusCode() < 300) {
				System.out.println("이메일이 성공적으로 전송되었습니다.");
			} else {
				throw new Exception("이메일 전송에 실패하였습니다" + response.getBody());
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
	}
}
