package kr.co.tj.recentlist;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecentListRepository extends JpaRepository<RecentListEntity, String>{

	List<RecentListEntity> findByUserId(String userId);

}
