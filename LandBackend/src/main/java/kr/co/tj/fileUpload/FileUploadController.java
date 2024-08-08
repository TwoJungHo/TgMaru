package kr.co.tj.fileUpload;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public ResponseEntity<?> Upload(@RequestParam("files") MultipartFile[] files){
		
		String attflid= fileUploadService.fileUpload(files);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("attflid", attflid);
		return ResponseEntity.ok().body(map);
	}
	
	@GetMapping("/findAttflId/{attflId}")
	public ResponseEntity<?> findAttflId(@PathVariable("attflId") String attflId){
		
		List<Map<String, Object>> result = fileUploadService.findAttflId(attflId);
		
		return ResponseEntity.ok().body(result);
	}
	
	@PostMapping("/downloadFile")
	public ResponseEntity<?> downloadFile(@RequestBody Map<String, String> map, HttpServletRequest request, HttpServletResponse response) {
	    String filePath = map.get("filePath");
	    String fileName = map.get("fileName");

	    if (filePath == null || fileName == null) {
	        return ResponseEntity.badRequest().body("File path or name is missing.");
	    }

	    File file = new File(filePath);

	    if (!file.exists()) {
	        return ResponseEntity.notFound().build();
	    }

	    try (BufferedInputStream in = new BufferedInputStream(new FileInputStream(file));
	         BufferedOutputStream out = new BufferedOutputStream(response.getOutputStream())) {

	        response.setContentType("application/octet-stream");
	        
	        // 파일 이름과 확장자를 포함한 Content-Disposition 헤더 설정
	        response.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(fileName, "UTF-8") + "\"");
	        response.setContentLengthLong(file.length());

	        response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
	        
	        byte[] buffer = new byte[4096];
	        int bytesRead;
	        while ((bytesRead = in.read(buffer)) != -1) {
	            out.write(buffer, 0, bytesRead);
	        }
	        out.flush();

	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while downloading the file.");
	    }

	    return ResponseEntity.ok().build();
	}


}
