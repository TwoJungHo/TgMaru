package kr.co.tj.freeBoard;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/freeboard")
@AllArgsConstructor
public class FreeBoardController {

	private FreeBoardService freeBoardService;
	
	@PostMapping("/insert")
	public ResponseEntity<?> insertBoard(@RequestBody Map<String, Object> map) {
		
		if(map.isEmpty()) {
			return ResponseEntity.ok().body(false);
		}
		
		freeBoardService.insert(map);
		
		return ResponseEntity.ok().body(true);
	}
	
	@GetMapping("/select")
	public ResponseEntity<?> getMethodName() {
		
		List<Map<String, Object>> result = freeBoardService.selectBoard();
		
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("/searchBoard/{searchType}/{searchValue}")
	public ResponseEntity<?> getsearchBoard(@PathVariable("searchType") String searchType, @PathVariable("searchValue") String searchValue) {
		
		List<Map<String, Object>> result = freeBoardService.findBoardList(searchType, searchValue);
		
		return ResponseEntity.ok().body(result);
	}
	
	@GetMapping("/getDetail/{Id}")
	public ResponseEntity<?> getDetail(@PathVariable("Id") String id) {
		
		Map<String, Object> result= freeBoardService.selectBoardDetail(id);
		
		return ResponseEntity.ok().body(result);
	}
	
	
	@PostMapping("/update")
	public ResponseEntity<?> updateBoard(@RequestBody Map<String, Object> map) {
		
		if(map.isEmpty()) {
			return ResponseEntity.ok().body(false);
		}
		boolean result = false;
		
		result = freeBoardService.updateBoard(map);
		
		return ResponseEntity.ok().body(result);
	}
	
}
