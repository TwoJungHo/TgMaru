package kr.co.tj.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Random;

@Component
@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private int authNumber;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void makeRandomNumber() {
        Random random = new Random();
        int checkNum = random.nextInt(888888) + 111111;
        System.out.println("인증번호 : " + checkNum);
        authNumber = checkNum;
    }

    public String sendEmail(String email) {
        makeRandomNumber();

        String setFrom = "qwer4667@naver.com";
        String toMail = email;
        String title = "인증 이메일";
        String content = "홈페이지를 방문해 주셔서 감사합니다." + "</br>" +
                "인증번호는 " + authNumber + "입니다.";

        mailSend(setFrom, toMail, title, content);

        return Integer.toString(authNumber);
    }

    public void mailSend(String setFrom, String toMail, String title, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(setFrom);
        message.setTo(toMail);
        message.setSubject(title);
        message.setText(content);
        javaMailSender.send(message);
    }
}
