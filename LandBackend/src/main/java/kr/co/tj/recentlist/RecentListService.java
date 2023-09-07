package kr.co.tj.recentlist;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RecentListService {

    private RecentListRepository recentListRepository;

    public RecentListDTO InputRecentList(RecentListDTO dto) {
    	// DB에 해당 아이디가 있는 조회
    	Optional<RecentListEntity> optional = recentListRepository.findById(dto.getUserId()+dto.getAddress());
    	
    	if( !optional.isEmpty()) {
    		RecentListEntity entity = optional.get();
    		dto = RecentListDTO.builder()
    		.address(entity.getAddress())
    		.id(entity.getId())
    		.createat(entity.getCreateat())
    		.userId(entity.getUserId())
    		.build();
    		
    		return dto;
    	}
    	// 없다면 아래 코드 실행
    	RecentListEntity NewEntity = RecentListEntity.builder()
    			.id(dto.getUserId()+dto.getAddress())
    			.userId(dto.getUserId())
    			.address(dto.getAddress())
    			.createat(new Date())
    			.build();
    	
    	NewEntity = recentListRepository.save(NewEntity);
    	
    	dto = RecentListDTO.builder()
    	.id(NewEntity.getId())
    	.userId(NewEntity.getUserId())
    	.address(NewEntity.getAddress())
    	.createat(NewEntity.getCreateat())
    	.build();
    	
        return dto;
    }
}
