package kr.co.tj.recentlist;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecentListService {

	private RecentListRepository recentListRepository;

	public RecentListDTO InputRecentList(RecentListDTO dto) {
		// DB에 해당 아이디가 있는 조회
		Optional<RecentListEntity> optional = recentListRepository.findById(dto.getUserId() + dto.getAddress());

		if (!optional.isEmpty()) {
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
				.id(dto.getUserId() + dto.getAddress())
				.userId(dto.getUserId())
				.address(dto.getAddress())
				.createat(new Date()).build();

		NewEntity = recentListRepository.save(NewEntity);

		dto = RecentListDTO.builder()
				.id(NewEntity.getId())
				.userId(NewEntity.getUserId())
				.address(NewEntity.getAddress())
				.createat(NewEntity.getCreateat())
				.build();

		return dto;
	}

	public List<RecentListDTO> findByRecentList(String id) {
	    List<RecentListEntity> list = recentListRepository.findByUserId(id);
	    
	    // createat 최신순으로 정렬
	    list.sort((e1, e2) -> e2.getCreateat().compareTo(e1.getCreateat()));
	    
	    // 최근 10개의 요소만 선택
	    List<RecentListEntity> recentItems = list.stream().limit(10).collect(Collectors.toList());
	    
	    // 나머지 요소 삭제 (DB에서 삭제)
	    for (RecentListEntity item : list) {
	        if (!recentItems.contains(item)) {
	            recentListRepository.delete(item);
	        }
	    }
	    
	    // recentItems를 DTO로 변환
	    List<RecentListDTO> list2 = recentItems.stream().map(x -> 
	        RecentListDTO.builder()
	            .address(x.getAddress())
	            .id(x.getId())
	            .userId(x.getUserId())
	            .createat(x.getCreateat())
	            .build()
	    ).collect(Collectors.toList());
	    
	    return list2;
	}

}
