package com.securitygateway.loginboilerplate.repository.attraction;

import com.securitygateway.loginboilerplate.model.fair.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {
    List<Attraction> findByFairId(Long fairId);
}
