package kr.co.tj.map;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PnuEntity {
	
	@Id
	@Column(unique = true)
	private String pnu;
	
	@Column(nullable = false)
	private String address;
	
}
