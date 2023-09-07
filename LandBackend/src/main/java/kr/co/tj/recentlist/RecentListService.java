package kr.co.tj.recentlist;

import kr.co.tj.map.HttpResponse;
import kr.co.tj.map.PnuDTO;
import kr.co.tj.map.PnuService;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class RecentListService {

    private RecentListRepository recentListRepository;
    private PnuService pnuService;

    public RecentListDTO InputRecentList(RecentListDTO dto) throws IOException {

        HttpResponse response = HttpResponse.builder()
                .address(dto.getAddress())
                .category("jibun")
                .build();

        StringBuilder sb = pnuService.HttpPnuResponse(response);
        PnuDTO Pdto = pnuService.parseApiResponse(sb.toString());

        List<Double> multiPolygon= pnuService.findByMultiPolygon(Pdto);

        RecentListEntity entity = RecentListEntity.builder()
                .address(dto.getAddress())
                .userId(dto.getUserId())
                .build();

        entity = recentListRepository.save(entity);

        dto = RecentListDTO.builder()
                .address(entity.getAddress())
                .userId(dto.getUserId())
                .multipolygon(multiPolygon)
                .id(entity.getId())
                .build();

        return dto;
    }
}
