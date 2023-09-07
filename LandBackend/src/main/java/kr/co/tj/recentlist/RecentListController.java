package kr.co.tj.recentlist;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import java.io.IOException;

@RestController
@RequestMapping("/recentlist")
@AllArgsConstructor
public class RecentListController {

	private RecentListService recentListService;
	
	@PostMapping("/input")
	public ResponseEntity<?> RecentListInput (@RequestBody RecentListDTO dto) throws IOException {
		if (dto.getUserId() == null || dto.getAddress() == null){
			return ResponseEntity.badRequest().body(dto);
		}

		dto = recentListService.InputRecentList(dto);

		return ResponseEntity.ok().body(dto);
	}
}
