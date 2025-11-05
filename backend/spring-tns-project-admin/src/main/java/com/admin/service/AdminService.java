package com.admin.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.admin.entity.AdminEntity;
import com.admin.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;

    // Create or Save Admin
    public AdminEntity save(AdminEntity admin) {
        return adminRepository.save(admin);
    }

    // Get Admin by ID
    public AdminEntity getAdmin(int id) {
        return adminRepository.findById(id).get();
    }

    // Update Admin details
    public AdminEntity update(int id, AdminEntity admin) {
        AdminEntity adm = adminRepository.findById(id).get();
        adm.setName(admin.getName());
        adm.setPassword(admin.getPassword());
        return adminRepository.save(adm);
    }

    // Delete Admin by ID
    public String delete(int id) {
        adminRepository.deleteById(id);
        return "Admin entity deleted with Id = " + id;
    }

    // Get list of all Admins
    public List<AdminEntity> getAdminList() {
        return adminRepository.findAll();
    }
}
