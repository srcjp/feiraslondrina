package com.securitygateway.loginboilerplate.repository.fair;

import com.securitygateway.loginboilerplate.model.fair.Fair;
import com.securitygateway.loginboilerplate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FairRepository extends JpaRepository<Fair, Long> {
    List<Fair> findByUser(User user);
}
