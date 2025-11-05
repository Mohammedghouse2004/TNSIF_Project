package com.admin.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.entity.AdminEntity;
import com.admin.service.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // http://localhost:8086/admins --POST
    @PostMapping
    public AdminEntity addAdmin(@RequestBody AdminEntity admin) {
        return adminService.save(admin);
    }

    // http://localhost:8086/admins/2 --GET
    @GetMapping(path = "/{id}")
    public AdminEntity getAdmin(@PathVariable int id) {
        return adminService.getAdmin(id);
    }

    // http://localhost:8086/admins/2 --PUT
    @PutMapping(path = "/{id}")
    public AdminEntity updateAdmin(@PathVariable int id, @RequestBody AdminEntity admin) {
        return adminService.update(id, admin);
    }

    // http://localhost:8086/admins/3 --DELETE
    @DeleteMapping(path = "/{id}")
    public String deleteAdmin(@PathVariable int id) {
        return adminService.delete(id);
    }

    // http://localhost:8086/admins --GET
    @GetMapping
    public List<AdminEntity> getAllAdmins() {
        return adminService.getAdminList();
    }
}

