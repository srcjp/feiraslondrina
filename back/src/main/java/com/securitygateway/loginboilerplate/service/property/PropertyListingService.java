package com.securitygateway.loginboilerplate.service.property;

import com.securitygateway.loginboilerplate.model.property.PropertyListing;
import com.securitygateway.loginboilerplate.repository.property.PropertyListingRepository;
import com.securitygateway.loginboilerplate.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PropertyListingService {
    private final PropertyListingRepository repository;
    private final com.securitygateway.loginboilerplate.service.file.ImageResizeService imageService;

    public PropertyListing save(PropertyListing listing, MultipartFile[] files, User user) throws IOException {
        List<String> paths = new ArrayList<>();
        if(files != null){
            int count = Math.min(files.length,3);
            for(int i=0;i<count;i++){
                paths.add(imageService.resizeAndSave(files[i]));
            }
        }
        listing.setImages(paths);
        listing.setUser(user);
        listing.setDeleted(false);
        listing.setCreatedAt(LocalDateTime.now());
        return repository.save(listing);
    }

    @Transactional(readOnly = true)
    public List<PropertyListing> listAll(){
        return repository.findByDeletedFalse();
    }

    @Transactional(readOnly = true)
    public List<PropertyListing> listByUser(User user){
        return repository.findByUser(user);
    }

    @Transactional(readOnly = true)
    public PropertyListing findById(Long id){
        return repository.findById(id).orElseThrow();
    }

    public PropertyListing update(Long id, PropertyListing data, MultipartFile[] files, User user) throws IOException {
        PropertyListing existing = repository.findById(id).orElseThrow();
        if(!existing.getUser().getId().equals(user.getId())) return existing;

        existing.setStatus(data.getStatus());
        existing.setTitle(data.getTitle());
        existing.setSubtitle(data.getSubtitle());
        existing.setPropertyType(data.getPropertyType());
        existing.setPrice(data.getPrice());
        existing.setCondoFee(data.getCondoFee());
        existing.setReference(data.getReference());
        existing.setRealtor(data.getRealtor());
        existing.setBedrooms(data.getBedrooms());
        existing.setSuites(data.getSuites());
        existing.setBathrooms(data.getBathrooms());
        existing.setGarages(data.getGarages());
        existing.setAreaUtil(data.getAreaUtil());
        existing.setAreaTotal(data.getAreaTotal());
        existing.setDescription(data.getDescription());
        existing.setPropertyItems(data.getPropertyItems());
        existing.setBuildingItems(data.getBuildingItems());
        existing.setNeighborhood(data.getNeighborhood());
        existing.setStreet(data.getStreet());
        existing.setNeighborhoodDescription(data.getNeighborhoodDescription());
        existing.setObservation(data.getObservation());
        existing.setPhone(data.getPhone());
        existing.setName(data.getName());
        existing.setDate(data.getDate());
        existing.setLatitude(data.getLatitude());
        existing.setLongitude(data.getLongitude());

        if(files != null && files.length > 0){
            List<String> paths = new ArrayList<>();
            int count = Math.min(files.length,3);
            for(int i=0;i<count;i++){
                paths.add(imageService.resizeAndSave(files[i]));
            }
            existing.setImages(paths);
        }

        return repository.save(existing);
    }

    public void softDelete(Long id, User user){
        PropertyListing existing = repository.findById(id).orElseThrow();
        if(!existing.getUser().getId().equals(user.getId())) return;
        existing.setDeleted(true);
        repository.save(existing);
    }
}
