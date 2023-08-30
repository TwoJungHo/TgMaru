package kr.co.tj.map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

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
