package kr.co.tj.recentlist;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecentListEntity {
	
	@Id
	@Column(unique = true)
	private String id;
	
	private String userId;
	
	private String address;
	
	private Date createat;
}
