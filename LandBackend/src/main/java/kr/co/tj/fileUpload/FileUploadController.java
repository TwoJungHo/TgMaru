package kr.co.tj.fileUpload;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/file")
@AllArgsConstructor
public class FileUploadController {

	private FileUploadService fileUploadService;
	
	@PostMapping("/upload")
	public ResponseEntity<?> SignUp(@RequestParam("files") MultipartFile[] files){
		
		String attflid= fileUploadService.fileUpload(files);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("attflid", attflid);
		return ResponseEntity.ok().body(map);
	}
}
