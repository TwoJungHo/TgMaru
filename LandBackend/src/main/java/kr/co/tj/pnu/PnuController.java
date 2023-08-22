package kr.co.tj.pnu;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/pnu")
@AllArgsConstructor
public class PnuController {
	
	private PnuService pnuservice;

	@PostMapping("/findpnu")
	public ResponseEntity<?> FindPnu(@RequestBody HttpResponse res) throws IOException{
		System.out.println(res);
		// DB에 해당 주소가 있는지 확인
		PnuDTO dto = pnuservice.findByAdd(res.getAddress());
		if(dto!=null) {
			List<Double> multiPolygon= pnuservice.findByPnu(dto);
			return ResponseEntity.ok(multiPolygon);
		}
		
		// 외부 api에 요청보낼 준비작업
		StringBuilder urlBuilder = new StringBuilder("http://map.vworld.kr/search.do");
        urlBuilder.append("?apiKey=4FB88625-7D2E-36D5-9AE9-F6401DF87374");
        urlBuilder.append("&q=" + URLEncoder.encode(res.getAddress(), "UTF-8"));
        urlBuilder.append("&category=" + res.getCategory());
		
        URL url = new URL(urlBuilder.toString());
        
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        
        BufferedReader rd;
        
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        
        dto = pnuservice.parseApiResponse(sb.toString());
       
        List<Double> multiPolygon= pnuservice.findByPnu(dto);
        
        return ResponseEntity.ok(multiPolygon);
        
	}
}