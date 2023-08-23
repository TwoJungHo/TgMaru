package kr.co.tj.pnu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PnuRepository extends JpaRepository<PnuEntity, String>{

	PnuEntity findByAddress(String address);

}
