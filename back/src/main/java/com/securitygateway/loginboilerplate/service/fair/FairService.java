package com.securitygateway.loginboilerplate.service.fair;

import com.securitygateway.loginboilerplate.model.fair.Fair;
import com.securitygateway.loginboilerplate.repository.fair.FairRepository;
import com.securitygateway.loginboilerplate.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FairService {
    private final FairRepository repository;

    public Fair saveFair(Fair fair, User user) {
        fair.setUser(user);
        fair.setCreatedAt(LocalDateTime.now());
        return repository.save(fair);
    }

    @Transactional(readOnly = true)
    public List<Fair> listAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Fair> listByUser(User user) {
        return repository.findByUser(user);
    }

    @Transactional(readOnly = true)
    public Fair findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Fair updateFair(Long id, Fair data, User user) {
        Fair existing = repository.findById(id).orElseThrow();
        if(!existing.getUser().getId().equals(user.getId())) return existing;

        existing.setName(data.getName());
        existing.setLatitude(data.getLatitude());
        existing.setLongitude(data.getLongitude());
        existing.setAddress(data.getAddress());
        existing.setDescription(data.getDescription());
        existing.setSchedule(data.getSchedule());
        existing.setSocialMedia(data.getSocialMedia());
        existing.setAttractions(data.getAttractions());

        return repository.save(existing);
    }

    public void deleteFair(Long id, User user) {
        Fair existing = repository.findById(id).orElseThrow();
        if(!existing.getUser().getId().equals(user.getId())) return;
        repository.delete(existing);
    }
}
