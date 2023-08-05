package kr.co.tj.pnu;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PnuService {
	
	private PnuRepository pnuRepository;

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

	public PnuDTO findByAdd(String address) {
		System.out.println(address);
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

}
