package kr.co.tj.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/test")
public class TestController {

	@PostMapping("/api")
	public ResponseEntity<?> name(@RequestBody TestDTO dto) throws IOException {
		
		StringBuilder urlBuilder = new StringBuilder("http://map.vworld.kr/search.do");
		urlBuilder.append("?apiKey="+dto.getApiKey());
		urlBuilder.append("&q="+ URLEncoder.encode(dto.getAddress(), "UTF-8"));
		urlBuilder.append("&category="+dto.getCategory());
		
		URL url = new URL(urlBuilder.toString());
		
		System.out.println(url);
		
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/json");
		System.out.println("응답코드" + conn.getResponseCode());
		
		BufferedReader rd;
		if(conn.getResponseCode() >= 200 && conn.getResponseCode() <=300) {
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		}else {
			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
		}
		StringBuilder sb = new StringBuilder();
		String line;
		while((line = rd.readLine())!= null) {
			sb.append(line);
		}
		rd.close();
		conn.disconnect();
		
//		ObjectMapper objectMapper = new ObjectMapper();
//		JsonNode responseJson = objectMapper.readTree(sb.toString());
//		System.out.println(responseJson);
		return ResponseEntity.ok(sb.toString());
	}
}
