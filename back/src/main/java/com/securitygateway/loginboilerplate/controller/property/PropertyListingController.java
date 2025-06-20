package com.securitygateway.loginboilerplate.controller.property;

import com.securitygateway.loginboilerplate.model.property.PropertyListing;
import com.securitygateway.loginboilerplate.model.User;
import com.securitygateway.loginboilerplate.security.CurrentUser;
import com.securitygateway.loginboilerplate.service.property.PropertyListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/properties")
@RequiredArgsConstructor
public class PropertyListingController {

    private final PropertyListingService service;

    @InitBinder
    public void initBinder(WebDataBinder binder){
        binder.setDisallowedFields("images");
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PropertyListing create(@ModelAttribute PropertyListing listing,
                                  @RequestPart(value = "images", required = false) MultipartFile[] images,
                                  @CurrentUser User user) throws IOException {
        return service.save(listing, images, user);
    }

    @PutMapping(value="/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PropertyListing update(@PathVariable Long id,
                                  @ModelAttribute PropertyListing listing,
                                  @RequestPart(value="images", required = false) MultipartFile[] images,
                                  @CurrentUser User user) throws IOException {
        return service.update(id, listing, images, user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, @CurrentUser User user){
        service.softDelete(id, user);
    }

    @GetMapping("/{id}")
    public PropertyListing get(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping
    public List<PropertyListing> list(){
        return service.listAll();
    }

    @GetMapping("/my")
    public List<PropertyListing> myListings(@CurrentUser User user){
        return service.listByUser(user);
    }
}
