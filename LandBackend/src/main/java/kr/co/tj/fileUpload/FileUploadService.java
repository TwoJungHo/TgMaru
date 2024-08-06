package kr.co.tj.fileUpload;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FileUploadService {

	private static final String UPLOADED_FOLDER = "C:\\app\\files\\";
	private FileUploadRepository fileUploadRepository;

	public String fileUpload(MultipartFile[] files) {

		StringBuilder sb = new StringBuilder();

		Date nowDate = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		String replaceDate = format.format(nowDate) + "\\";

		File uploadDir = new File(UPLOADED_FOLDER + replaceDate);

		if (!uploadDir.exists()) {
			if (uploadDir.mkdirs()) {
				System.out.println("Upload directory created ==> Path : " + UPLOADED_FOLDER + replaceDate);
			} else {
				return null;
			}
		}
		
		ArrayList<String> arr = new ArrayList<String>();
		
		String attflId = UUID.randomUUID().toString();
		for (MultipartFile file : files) {
			try {
				Path path = Paths.get(UPLOADED_FOLDER + replaceDate + file.getOriginalFilename());
				Files.write(path, file.getBytes());
				arr.add(UPLOADED_FOLDER + replaceDate + file.getOriginalFilename());
				
				
				int seq = 1;
				
				FileUploadEntity entity = FileUploadEntity.builder()
						.attflId(attflId)
						.fileName(file.getOriginalFilename())
						.filePath(UPLOADED_FOLDER + replaceDate + file.getOriginalFilename())
						.seq(seq)
						.useYn("Y")
						.createDate(new Date())
						.build();
				
				fileUploadRepository.save(entity);
				seq++;
				
			} catch (Exception e) {
				return null;
			}
		}

		return attflId;

	}
}
