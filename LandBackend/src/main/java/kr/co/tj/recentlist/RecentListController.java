package kr.co.tj.recentlist;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/recentlist")
@AllArgsConstructor
public class RecentListController {

	private RecentListService recentListService;
	
	
}
