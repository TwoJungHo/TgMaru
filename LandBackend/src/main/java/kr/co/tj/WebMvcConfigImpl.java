package kr.co.tj;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfigImpl implements WebMvcConfigurer {
	
	@Override
	public void addCorsMappings(CorsRegistry regustry) {
		regustry.addMapping("/**")
		.allowedOrigins("http://localhost:3000", "http://96junghos.mooo.com:3000")
		.allowedMethods("GET", "POST", "PUT", "DELETE")
		.allowedHeaders("*")
		.allowCredentials(true)
		.maxAge(3600);
	}
}
