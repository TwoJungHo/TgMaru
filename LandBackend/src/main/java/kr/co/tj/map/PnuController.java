package kr.co.tj.map;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/mapinfo")
@AllArgsConstructor
public class PnuController {
	
	private PnuService pnuservice;

	@PostMapping("/findpnu")
	public ResponseEntity<?> FindPnu(@RequestBody HttpResponse res) throws IOException{
		
		
        StringBuilder sb = pnuservice.HttpPnuResponse(res);
        PnuDTO dto = pnuservice.parseApiResponse(sb.toString());
       
        List<Double> multiPolygon= pnuservice.findByMultiPolygon(dto);
        
        return ResponseEntity.ok(multiPolygon);
        
	}
}
