package kr.co.tj.freeBoard;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FreeBoardRepository extends JpaRepository<FreeBoardEntity, String>{
	
	 @Query(value = "SELECT A.content, DATE_FORMAT(A.createDate, '%Y-%m-%d') as date, A.title, B.username as author, A.id, A.userId " +
             "FROM freeboard A " +
             "LEFT JOIN userentity B ON A.userId = B.userId " +
             "ORDER BY A.createDate DESC", nativeQuery = true)
	 List<Map<String, Object>> findFreeBoardList();
	 
	 @Query(value = "SELECT A.content, DATE_FORMAT(A.createDate, '%Y-%m-%d') as date, A.title, B.username as author, A.id, A.userId " +
	            "FROM freeboard A " +
	            "LEFT JOIN userentity B ON A.userId = B.userId " +
	            "WHERE (:searchType = '0' AND (A.content LIKE :searchValue OR A.title LIKE :searchValue)) " +
	            "OR (:searchType = '1' AND A.userId = :searchValue) " +
	            "ORDER BY A.createDate DESC", nativeQuery = true)
	List<Map<String, Object>> findFreeBoardType(@Param("searchType") String searchType, @Param("searchValue") String searchValue);
	 
}
