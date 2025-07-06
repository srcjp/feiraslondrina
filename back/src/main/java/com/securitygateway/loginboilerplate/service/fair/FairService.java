package com.securitygateway.loginboilerplate.service.fair;

import com.securitygateway.loginboilerplate.model.fair.Fair;
import com.securitygateway.loginboilerplate.repository.fair.FairRepository;
import com.securitygateway.loginboilerplate.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FairService {
    private final FairRepository repository;
    private final ImageResizeService imageService;

    public Fair saveFair(Fair fair, MultipartFile image, User user) throws IOException {
        if (image != null && !image.isEmpty()) {
            fair.setImagePath(imageService.resizeAndSave(image));
        }
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

    public Fair updateFair(Long id, Fair data, MultipartFile image, User user) throws IOException {
        Fair existing = repository.findById(id).orElseThrow();
        if(!existing.getUser().getId().equals(user.getId())) return existing;

        existing.setName(data.getName());
        existing.setLatitude(data.getLatitude());
        existing.setLongitude(data.getLongitude());
        existing.setAddress(data.getAddress());
        existing.setDescription(data.getDescription());
        existing.setSchedule(data.getSchedule());
        existing.setOpeningHours(data.getOpeningHours());
        existing.setSocialMedia(data.getSocialMedia());
        existing.setAttractions(data.getAttractions());
        existing.setResponsible(data.getResponsible());
        existing.setPhone(data.getPhone());
        existing.setType(data.getType());
        if (image != null && !image.isEmpty()) {
            existing.setImagePath(imageService.resizeAndSave(image));
        }

        return repository.save(existing);
    }

    public void deleteFair(Long id, User user) {
        Fair existing = repository.findById(id).orElseThrow();
        if(!existing.getUser().getId().equals(user.getId())) return;
        repository.delete(existing);
    }
}
