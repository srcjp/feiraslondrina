package com.securitygateway.loginboilerplate.controller.attraction;

import com.securitygateway.loginboilerplate.model.fair.Attraction;
import com.securitygateway.loginboilerplate.model.fair.Fair;
import com.securitygateway.loginboilerplate.repository.attraction.AttractionRepository;
import com.securitygateway.loginboilerplate.service.fair.FairService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attractions")
@RequiredArgsConstructor
public class AttractionController {

    private final AttractionRepository repository;
    private final FairService fairService;

    @GetMapping("/fair/{fairId}")
    public List<Attraction> listByFair(@PathVariable Long fairId) {
        return repository.findByFairId(fairId);
    }

    @PostMapping("/fair/{fairId}")
    public Attraction create(@PathVariable Long fairId, @RequestBody Attraction attraction) {
        Fair fair = fairService.findById(fairId);
        attraction.setId(null);
        attraction.setFair(fair);
        return repository.save(attraction);
    }

    @GetMapping("/{id}")
    public Attraction get(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public Attraction update(@PathVariable Long id, @RequestBody Attraction data) {
        Attraction existing = repository.findById(id).orElseThrow();
        existing.setName(data.getName());
        existing.setSpecialty(data.getSpecialty());
        existing.setSocialMedia(data.getSocialMedia());
        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
