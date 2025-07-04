package com.securitygateway.loginboilerplate.controller.fair;

import com.securitygateway.loginboilerplate.model.fair.Fair;
import com.securitygateway.loginboilerplate.model.User;
import com.securitygateway.loginboilerplate.security.CurrentUser;
import com.securitygateway.loginboilerplate.service.fair.FairService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fairs")
@RequiredArgsConstructor
public class FairController {

    private final FairService service;

    @PostMapping
    public Fair create(@RequestBody Fair fair, @CurrentUser User user) {
        return service.saveFair(fair, user);
    }

    @PutMapping("/{id}")
    public Fair update(@PathVariable Long id, @RequestBody Fair fair, @CurrentUser User user) {
        return service.updateFair(id, fair, user);
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
