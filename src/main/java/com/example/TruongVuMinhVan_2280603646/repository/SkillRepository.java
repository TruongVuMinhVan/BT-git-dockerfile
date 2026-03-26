package com.example.TruongVuMinhVan_2280603646.repository;

import com.example.TruongVuMinhVan_2280603646.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
}
