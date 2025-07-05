package com.securitygateway.loginboilerplate.controller.fair;

import com.securitygateway.loginboilerplate.model.fair.Fair;
import com.securitygateway.loginboilerplate.model.User;
import com.securitygateway.loginboilerplate.security.CurrentUser;
import com.securitygateway.loginboilerplate.service.fair.FairService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fairs")
@RequiredArgsConstructor
public class FairController {

    private final FairService service;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.setDisallowedFields("imagePath");
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Fair create(@ModelAttribute Fair fair,
                       @RequestPart(value = "image", required = false) MultipartFile image,
                       @CurrentUser User user) throws IOException {
        return service.saveFair(fair, image, user);
    }

    @PutMapping(value="/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Fair update(@PathVariable Long id,
                       @ModelAttribute Fair fair,
                       @RequestPart(value="image", required = false) MultipartFile image,
                       @CurrentUser User user) throws IOException {
        return service.updateFair(id, fair, image, user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, @CurrentUser User user) {
        service.deleteFair(id, user);
    }

    @GetMapping("/{id}")
    public Fair get(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping
    public List<Fair> list() {
        return service.listAll();
    }

    @GetMapping("/my")
    public List<Fair> myFairs(@CurrentUser User user) {
        return service.listByUser(user);
    }
}
