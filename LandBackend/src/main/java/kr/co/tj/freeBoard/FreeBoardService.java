package kr.co.tj.freeBoard;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FreeBoardService {
	
	private FreeBoardRepository freeBoardRepository;

	public void insert(Map<String, Object> map) {
		
		Date date = new Date();
		
		FreeBoardEntity entity = FreeBoardEntity.builder()
		.userId((String) map.get("userId"))
		.title((String) map.get("title"))
		.content((String) map.get("content"))
		.attflId((String)map.get("attflId"))
		.createDate(date)
		.build();
		
		freeBoardRepository.save(entity);
	}

	public List<Map<String, Object>> selectBoard() {
		
		List<Map<String, Object>> map = freeBoardRepository.findFreeBoardList();
		
		return map;
		
	}

	public Map<String, Object> selectBoardDetail(String id) {
		
		Optional<FreeBoardEntity> optional = freeBoardRepository.findById(id);
		
		if(optional.isEmpty()) {
			return null;
		}
		
		FreeBoardEntity entity = optional.get();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		String dateFormat = simpleDateFormat.format(entity.getCreateDate());
		map.put("id", entity.getId());
		map.put("content", entity.getContent());
		map.put("title", entity.getTitle());
		map.put("userId", entity.getUserId());
		map.put("createDate", dateFormat);
		return map;
	}

	public boolean updateBoard(Map<String, Object> map) {
		
		Optional<FreeBoardEntity> optional = freeBoardRepository.findById((String) map.get("id"));
		
		if(optional.isEmpty()) {
			return false;
		}
		FreeBoardEntity createEntity = optional.get();
		
		Date date = new Date();
		
		FreeBoardEntity entity = FreeBoardEntity.builder()
				.id((String) map.get("id"))
				.userId((String)map.get("userId"))
				.title((String) map.get("title"))
				.content((String) map.get("content"))
				.createDate(createEntity.getCreateDate())
				.modifyDate(date)
				.build();
				
				freeBoardRepository.save(entity);
		return true;
		
	}
	
	
}
