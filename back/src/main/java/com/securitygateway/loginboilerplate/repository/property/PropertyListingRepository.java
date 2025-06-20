package com.securitygateway.loginboilerplate.repository.property;

import com.securitygateway.loginboilerplate.model.property.PropertyListing;
import com.securitygateway.loginboilerplate.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyListingRepository extends JpaRepository<PropertyListing, Long> {
    List<PropertyListing> findByUser(User user);

    List<PropertyListing> findByDeletedFalse();

    List<PropertyListing> findByUserAndDeletedFalse(User user);
}
