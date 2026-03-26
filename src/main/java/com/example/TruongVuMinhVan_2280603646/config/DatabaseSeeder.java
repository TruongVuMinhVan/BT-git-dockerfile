package com.example.TruongVuMinhVan_2280603646.config;

import com.example.TruongVuMinhVan_2280603646.model.Skill;
import com.example.TruongVuMinhVan_2280603646.repository.SkillRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DatabaseSeeder {

    @Bean
    public CommandLineRunner seedDatabase(SkillRepository skillRepository) {
        return args -> {
            if (skillRepository.count() == 0) {
                System.out.println("No skills found in database. Seeding default dataset...");

                Skill s1 = new Skill("Backend & Database", "Node.js, Express, MongoDB - RESTful API integration and database management.", "fa-server");
                Skill s2 = new Skill("AI & Machine Learning", "Python - develop and train predictive AI models with Google Colab & Kaggle.", "fa-brain");
                Skill s3 = new Skill("Web & Mobile Dev", "Next.js, React, Dart - responsive, scalable web and cross-platform mobile apps.", "fa-laptop-code");
                Skill s4 = new Skill("UI/UX & Styling", "Tailwind CSS, Bootstrap - clean, reusable UI components.", "fa-palette");
                Skill s5 = new Skill("Tools & Workflow", "Git, GitHub, Docker, Trello - Scrum, pull requests, containerization.", "fa-tools");
                Skill s6 = new Skill("Performance & Testing", "Lazy loading, code splitting, black/white box, unit & integration testing.", "fa-bolt");
                Skill s7 = new Skill("Soft Skills", "Fast self-learning, logical problem-solving, time management, adaptability.", "fa-rocket");

                skillRepository.saveAll(Arrays.asList(s1, s2, s3, s4, s5, s6, s7));
                System.out.println("Default dataset seeded successfully into MySQL!");
            } else {
                System.out.println("Dataset already exists. Skipping database seeding.");
            }
        };
    }
}
