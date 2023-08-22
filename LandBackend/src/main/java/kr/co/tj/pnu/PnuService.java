package kr.co.tj.pnu;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PnuService {
	
	private PnuRepository pnuRepository;

	// 결과값을 dto로 저장
	public PnuDTO parseApiResponse(String reponse) {

		PnuDTO dto = new PnuDTO();

		try {
			// JSON 파싱을 위해 ObjectMapper 사용
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode rootNode = objectMapper.readTree(reponse);
			JsonNode listNode = rootNode.get("LIST");

			for (JsonNode itemNode : listNode) {
				// API 응답 결과로 파싱할 필드들을 가져와서 TestDTO 객체로 생성
				String PNU = itemNode.get("PNU").asText();
				String JUSO = itemNode.get("JUSO").asText();

				dto.setPnu(PNU);
				dto.setAddress(JUSO);
				
				PnuEntity entity = PnuEntity.builder()
						.pnu(dto.getPnu())
						.address(dto.getAddress())
						.build();
				
				pnuRepository.save(entity);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return dto;
	}

	// DB에 해당 주소가 있는지 확인
	public PnuDTO findByAdd(String address) {
		PnuEntity entity= pnuRepository.findByAddress(address);
		if(entity==null) {
			return null;
		}
		PnuDTO dto = PnuDTO.builder()
				.pnu(entity.getPnu())
				.address(entity.getAddress())
				.build();
		return dto;
	}

	public List<Double> findByPnu(PnuDTO dto) throws IOException {
		StringBuilder urlBuilder = new StringBuilder("http://api.vworld.kr/req/data");
        urlBuilder.append("?key=84DF8EE3-31FB-3E67-B49C-4A8870DE3D48");
        urlBuilder.append("&service=data");
        urlBuilder.append("&request=GetFeature");
        urlBuilder.append("&data=LP_PA_CBND_BUBUN");
        urlBuilder.append("&attrFilter=pnu:like:"+dto.getPnu());
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
        JsonNode multiPolygonNode = responseJson.get("response")
                                               .get("result")
                                               .get("featureCollection")
                                               .get("features")
                                               .get(0)
                                               .get("geometry")
                                               .get("coordinates")
                                               .get(0)
                                               .get(0)
                                               ;

        // 멀티폴리곤 값을 리스트로 변환
        List<Double> multiPolygon = objectMapper.convertValue(multiPolygonNode, List.class);

        return multiPolygon;
	}

}
