package kr.co.tj.map;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.tj.recentlist.RecentListController;
import kr.co.tj.recentlist.RecentListDTO;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PnuService {

	private PnuRepository pnuRepository;
	private RecentListController recentListController;
	private RecentListDTO recentListDTO;

	// Pnu찾기
    public StringBuilder HttpPnuResponse(HttpResponse res) throws IOException {
    	
    	if(res.getUserId() != null) {
			recentListDTO = RecentListDTO.builder()
					.address(res.getAddress())
					.userId(res.getUserId())
					.build();
			recentListController.RecentListInput(recentListDTO);
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

        BufferedReader rd = null;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else if (conn.getResponseCode() == 302) {
            // 302코드가 오면 리다이렉션
            String redirectLocation = conn.getHeaderField("Location");
            if (redirectLocation != null) {
                // 리다이렉션된 url에 대해 새로 연결시도
                URL newUrl = new URL(redirectLocation);
                conn = (HttpURLConnection) newUrl.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/json");

                if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                    rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                } else {
                    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                }
            }
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
        return sb;
    }

	// 찾은 pnu값이 String형으로 되어있어서 dto로 변환작업
	public PnuDTO parseApiResponse(String response) {
	    PnuDTO dto = new PnuDTO();

	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        JsonNode rootNode = objectMapper.readTree(response);
	        JsonNode listNode = rootNode.get("LIST");

	        // LIST 배열에서 첫 번째 객체를 가져옴
	        JsonNode firstItemNode = listNode.get(0);
	        
	        // "PNU"와 "JUSO" 값을 추출
	        String PNU = firstItemNode.get("PNU").asText();
	        String JUSO = firstItemNode.get("JUSO").asText();

	        dto.setPnu(PNU);
	        dto.setAddress(JUSO);

	        Optional<PnuEntity> optional = pnuRepository.findById(PNU);

	        if (!optional.isPresent()) {
	            PnuEntity entity = PnuEntity.builder().pnu(dto.getPnu()).address(dto.getAddress()).build();
	            pnuRepository.save(entity);
	        }
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    
	    return dto;
	}


	// pnu값으로 multipolygon찾기
	public List<Double> findByMultiPolygon(PnuDTO dto) throws IOException {
		StringBuilder urlBuilder = new StringBuilder("http://api.vworld.kr/req/data");
		urlBuilder.append("?key=84DF8EE3-31FB-3E67-B49C-4A8870DE3D48");
		urlBuilder.append("&service=data");
		urlBuilder.append("&request=GetFeature");
		urlBuilder.append("&data=LP_PA_CBND_BUBUN");
		urlBuilder.append("&attrFilter=pnu:like:" + dto.getPnu());
		urlBuilder.append("&domain=http://localhost:3000");

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

		// JSON 파싱
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode responseJson = objectMapper.readTree(sb.toString());

		// 멀티폴리곤 추출
		JsonNode multiPolygonNode = responseJson.get("response").get("result").get("featureCollection").get("features")
				.get(0).get("geometry").get("coordinates").get(0).get(0);

		// 멀티폴리곤 값을 리스트로 변환
		List<Double> multiPolygon = objectMapper.convertValue(multiPolygonNode, List.class);
		
		return multiPolygon;
	}

}
