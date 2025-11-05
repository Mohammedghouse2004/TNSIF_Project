package com.admin.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.admin.entity.AdminEntity;
@Repository
public interface AdminRepository extends JpaRepository<AdminEntity,Integer> {

}
